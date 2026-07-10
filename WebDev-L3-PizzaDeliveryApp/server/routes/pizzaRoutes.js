import express from "express";
import {
  getAllPizzas,
  createPizza,
  updatePizza,
  deletePizza,
} from "../controllers/pizzaController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPizzas); 
router.post("/admin", protect, adminOnly, createPizza);
router.put("/admin/:id", protect, adminOnly, updatePizza);
router.delete("/admin/:id", protect, adminOnly, deletePizza);

export default router;