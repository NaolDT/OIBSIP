import express from "express";
import { createOrder, getOrderById, getMyOrders , createRazorpayOrder,
  verifyPayment,} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.post("/:id/razorpay", protect, createRazorpayOrder);
router.post("/:id/verify", protect, verifyPayment);

export default router;