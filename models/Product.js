const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true },
  tags: [{ type: String }],
  rating: { type: Number, min: 0, max: 5, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model("Product", productSchema);

