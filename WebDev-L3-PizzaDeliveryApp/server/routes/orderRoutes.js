import express from "express";
import { createOrder, getOrderById, getMyOrders , createRazorpayOrder,
  verifyPayment,updateOrderStatus,getAllOrders} from "../controllers/orderController.js";
import { protect ,adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/admin/all", protect, adminOnly, getAllOrders);
router.put("/admin/:id/status", protect, adminOnly, updateOrderStatus);
router.post("/:id/razorpay", protect, createRazorpayOrder);
router.post("/:id/verify", protect, verifyPayment);
router.get("/:id", protect, getOrderById);

export default router;