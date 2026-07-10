import express from "express";
import {
  getInventoryByCategory,
  getAllInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getInventoryByCategory);

router.get("/admin/all", protect, adminOnly, getAllInventory);
router.post("/admin", protect, adminOnly, createInventoryItem);
router.put("/admin/:id", protect, adminOnly, updateInventoryItem);
router.delete("/admin/:id", protect, adminOnly, deleteInventoryItem);

export default router;