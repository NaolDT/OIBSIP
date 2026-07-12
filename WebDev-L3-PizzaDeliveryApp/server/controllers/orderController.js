import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import { calculatePizzaPrice } from "../utils/pricing.js";
import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";
export const createOrder = async (req, res) => {
  try {
    const { base, sauce, cheese, vegetables = [] } = req.body;

    if (!base || !sauce || !cheese) {
      return res.status(400).json({ message: "Base, sauce, and cheese are required" });
    }

    const namesToCheck = [
      { category: "base", name: base },
      { category: "sauce", name: sauce },
      { category: "cheese", name: cheese },
      ...vegetables.map((v) => ({ category: "vegetable", name: v })),
    ];

    const unavailable = [];

    for (const { category, name } of namesToCheck) {
      const item = await Inventory.findOne({ category, name });
      if (!item || item.stock <= 0) {
        unavailable.push(name);
      }
    }

    if (unavailable.length > 0) {
      return res.status(400).json({
        message: `Currently out of stock: ${unavailable.join(", ")}`,
      });
    }

    const totalAmount = calculatePizzaPrice({ base, sauce, cheese, vegetables });

    const order = await Order.create({
      user: req.user.userId,
      pizza: { base, sauce, cheese, vegetables },
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "Order Received",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createRazorpayOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(400).json({ message: "Payment verification failed" });
    }

    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    const { base, sauce, cheese, vegetables } = order.pizza;
    const usedIngredients = [
      { category: "base", name: base },
      { category: "sauce", name: sauce },
      { category: "cheese", name: cheese },
      ...vegetables.map((v) => ({ category: "vegetable", name: v })),
    ];

    for (const { category, name } of usedIngredients) {
      await Inventory.findOneAndUpdate(
        { category, name },
        { $inc: { stock: -1 } }
      );
    }

    res.json({ message: "Payment verified, order confirmed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Order Received", "In Kitchen", "Sent to Delivery"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};