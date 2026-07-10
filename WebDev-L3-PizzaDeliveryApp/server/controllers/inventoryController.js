import Inventory from "../models/Inventory.js";

export const getInventoryByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const items = await Inventory.find(filter).sort({ name: 1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, threshold } = req.body;

    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    if (stock !== undefined) item.stock = stock;
    if (threshold !== undefined) item.threshold = threshold;

    if (item.stock >= item.threshold) {
      item.lowStockAlertSent = false;
    }

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInventoryItem = async (req, res) => {
  try {
    const { category, name, stock, threshold } = req.body;

    if (!category || !name) {
      return res.status(400).json({ message: "Category and name are required" });
    }

    const item = await Inventory.create({ category, name, stock, threshold });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Inventory.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json({ message: "Inventory item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};