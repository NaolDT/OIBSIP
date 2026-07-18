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
    basePrice: 150,
    image: "/images/margherita.jpg",
    base: "Thin Crust",
    sauce: "Marinara",
    cheese: "Mozzarella",
    vegetables: [],
  },
  {
    name: "Spicy Paneer Tikka",
    description: "Paneer-style heat with capsicum and onion on a spicy arrabbiata base.",
    basePrice: 200,
    image: "/images/spicy-paneer.jpg",
    base: "Thick Crust",
    sauce: "Spicy Arrabbiata",
    cheese: "Cheddar",
    vegetables: ["Onion", "Capsicum", "Jalapeno"],
  },
  {
    name: "BBQ Veggie Delight",
    description: "Smoky BBQ sauce loaded with corn, onion, and capsicum.",
    basePrice: 190,
    image: "/images/bbq-veggie.jpg",
    base: "Cheese Burst",
    sauce: "BBQ",
    cheese: "Mozzarella",
    vegetables: ["Corn", "Onion", "Capsicum"],
  },
  {
    name: "Mushroom Alfredo",
    description: "Creamy alfredo base with mushroom and parmesan.",
    basePrice: 210,
    image: "/images/mushroom-alfredo.jpg",
    base: "Whole Wheat",
    sauce: "Alfredo",
    cheese: "Parmesan",
    vegetables: ["Mushroom"],
  },
  {
    name: "Garden Harvest",
    description: "A loaded veggie pizza — onion, capsicum, olives, corn, mushroom.",
    basePrice: 220,
    image: "/images/garden-harvest.jpg",
    base: "Gluten Free",
    sauce: "Pesto",
    cheese: "Mozzarella",
    vegetables: ["Onion", "Capsicum", "Olives", "Corn", "Mushroom"],
  },
  {
    name: "Classic Pepper Onion",
    description: "A simple crowd-pleaser — capsicum and onion on marinara.",
    basePrice: 170,
    image: "/images/pepper-onion.jpg",
    base: "Thin Crust",
    sauce: "Marinara",
    cheese: "Cheddar",
    vegetables: ["Capsicum", "Onion"],
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