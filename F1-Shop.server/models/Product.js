const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
