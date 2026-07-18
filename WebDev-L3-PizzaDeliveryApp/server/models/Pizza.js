import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    basePrice: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },

  
    base: { type: String, required: true },
    sauce: { type: String, required: true },
    cheese: { type: String, required: true },
    vegetables: [{ type: String }],
  },
  { timestamps: true }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);
export default Pizza;