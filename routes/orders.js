const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const { products, paymentMethod } = req.body;
    const productDocs = await Promise.all(products.map(async ({ product, quantity }) => {
      const found = await Product.findById(product);
      return found ? found.price * quantity : 0;
    }));
    const totalPrice = productDocs.reduce((sum, price) => sum + price, 0);
    const order = new Order({
      user: req.user.userId,
      products,
      totalPrice,
      status: "pending",
      paymentMethod,
      paymentStatus: "pending",
      purchasedAt: new Date(),
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
});
module.exports = router;

