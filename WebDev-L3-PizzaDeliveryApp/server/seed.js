import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Inventory from "./models/Inventory.js";
import Pizza from "./models/Pizza.js";

const inventoryData = [
  { category: "base", name: "Thin Crust", stock: 50, threshold: 15 },
  { category: "base", name: "Thick Crust", stock: 40, threshold: 15 },
  { category: "base", name: "Whole Wheat", stock: 30, threshold: 10 },
  { category: "base", name: "Cheese Burst", stock: 25, threshold: 10 },
  { category: "base", name: "Gluten Free", stock: 20, threshold: 8 },

  { category: "sauce", name: "Marinara", stock: 40, threshold: 10 },
  { category: "sauce", name: "BBQ", stock: 35, threshold: 10 },
  { category: "sauce", name: "Pesto", stock: 20, threshold: 8 },
  { category: "sauce", name: "Alfredo", stock: 25, threshold: 8 },
  { category: "sauce", name: "Spicy Arrabbiata", stock: 15, threshold: 8 },

  { category: "cheese", name: "Mozzarella", stock: 60, threshold: 15 },
  { category: "cheese", name: "Cheddar", stock: 30, threshold: 10 },
  { category: "cheese", name: "Parmesan", stock: 20, threshold: 8 },

  { category: "vegetable", name: "Onion", stock: 50, threshold: 15 },
  { category: "vegetable", name: "Capsicum", stock: 45, threshold: 15 },
  { category: "vegetable", name: "Mushroom", stock: 30, threshold: 10 },
  { category: "vegetable", name: "Olives", stock: 25, threshold: 10 },
  { category: "vegetable", name: "Corn", stock: 40, threshold: 15 },
  { category: "vegetable", name: "Jalapeno", stock: 20, threshold: 8 },
];

const pizzaData = [
  {
    name: "Margherita Classic",
    description: "Simple, timeless — marinara, mozzarella, basil.",
    basePrice: 199,
  },
  {
    name: "Spicy Paneer Tikka",
    description: "Paneer, capsicum, onion, spicy arrabbiata sauce.",
    basePrice: 249,
  },
  {
    name: "BBQ Veggie Delight",
    description: "BBQ sauce, corn, onion, capsicum, mozzarella.",
    basePrice: 229,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Inventory.deleteMany();
    await Pizza.deleteMany();

    await Inventory.insertMany(inventoryData);
    await Pizza.insertMany(pizzaData);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDatabase();