const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, school, subjects } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      school,
      subjects,
    });
    await user.save();
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      school: user.school,
      subjects: user.subjects,
    };
    if (user.role === "admin") {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res.status(201).json({
        message: "User registered successfully",
        token,
        user: userData,
      });
    }
    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});
 rutt
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      school: user.school,
      subjects: user.subjects,
    };
    if (user.role === "admin") {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res.json({
        message: "Login successful",
        token,
        user: userData,
      });
    }
    res.json({
      message: "Login successful (no token for regular users)",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});
module.exports = router;
