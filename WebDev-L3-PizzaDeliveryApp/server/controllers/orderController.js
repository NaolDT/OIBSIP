import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import { calculatePizzaPrice } from "../utils/pricing.js";

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