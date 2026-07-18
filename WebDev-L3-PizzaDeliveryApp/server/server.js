import "dotenv/config";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import pizzaRoutes from "./routes/pizzaRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { startLowStockCron } from "./jobs/lowStockCron.js";
import "dotenv/config";


connectDB();
startLowStockCron();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Pizza server is alive" });
});

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});