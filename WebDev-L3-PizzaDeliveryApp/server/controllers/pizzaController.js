import Pizza from "../models/Pizza.js";

export const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPizza = async (req, res) => {
  try {
    const { name, description, image, basePrice } = req.body;

    if (!name || !basePrice) {
      return res.status(400).json({ message: "Name and basePrice are required" });
    }

    const pizza = await Pizza.create({ name, description, image, basePrice });
    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePizza = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const pizza = await Pizza.findByIdAndUpdate(id, updates, {
      new: true,         
      runValidators: true, 
    });

    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePizza = async (req, res) => {
  try {
    const { id } = req.params;
    const pizza = await Pizza.findByIdAndUpdate(id, { isAvailable: false }, { new: true });

    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.json({ message: "Pizza removed from catalog" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};