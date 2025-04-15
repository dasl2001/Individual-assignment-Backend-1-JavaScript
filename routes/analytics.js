const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/admin"); 

//Månadsvis intäkt (senaste 12 månader)
router.get("/revenue-per-month", auth, adminAuth, async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const result = await Order.aggregate([
      {
        $match: {
          purchasedAt: { $gte: oneYearAgo },
          paymentStatus: "completed",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$purchasedAt" },
            month: { $month: "$purchasedAt" },
          },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    const months = [
      "januari", "februari", "mars", "april", "maj", "juni",
      "juli", "augusti", "september", "oktober", "november", "december"
    ];

    const formatted = {};
    result.forEach((item) => {
      const label = `${months[item._id.month - 1]}-${item._id.year}`;
      formatted[label] = Number(item.totalRevenue.toFixed(2));
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta intäktsdata" });
  }
});

//Topp 10 kunder baserat på spenderade pengar
router.get("/top-customers", auth, adminAuth, async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { paymentStatus: "completed" } },
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta kunddata" });
  }
});

module.exports = router;



