require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { seedDatabase, wipeAndReseed } = require("./utils/seed");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products"); 
const orderRoutes = require("./routes/orders");
const analyticsRoutes = require("./routes/analytics");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);              
app.use("/api/products", productRoutes);       
app.use("/api/orders", orderRoutes);           
app.use("/api/analytics", analyticsRoutes);    
app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to Hakim Livs" });
});
app.post("/api/wipe", async (req, res) => {
  try {
    const result = await wipeAndReseed();
    res.json({
      message: "Database wiped and reseeded successfully",
      ...result,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to wipe and reseed database" });
  }
});
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/core-academy")
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedDatabase();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

