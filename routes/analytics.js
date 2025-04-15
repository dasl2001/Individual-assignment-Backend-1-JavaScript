/*
Importerar nödvändiga moduler.
*/
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/admin"); 

/*
Månadsvis intäkt 12 månader. 
*/
router.get("/revenue-per-month", auth, adminAuth, async (req, res) => {
  try {

/*
Datum för ett år tillbaka. 
*/
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

/*
Hämta och gruppera alla genomförda köp per månad.
*/
    const result = await Order.aggregate([
      {
        $match: {

/*
Endast köp senaste året.
*/
          purchasedAt: { $gte: oneYearAgo },

/*
Endast slutförda betalningar.
*/
          paymentStatus: "completed",
        },
      },
      {

/*
Gruppera efter år, månad och summera totala intäkten nyast först. 
*/
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

/*
Månadsnamn på svenska.
*/
    const months = [
      "januari", "februari", "mars", "april", "maj", "juni",
      "juli", "augusti", "september", "oktober", "november", "december"
    ];

/*
Formatera svaret till { månad-år: summa }. 
*/
    const formatted = {};
    result.forEach((item) => {
      const label = `${months[item._id.month - 1]}-${item._id.year}`;
      formatted[label] = Number(item.totalRevenue.toFixed(2));
    });

/*
Skicka JSON-svar.
*/
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta intäktsdata" });
  }
});

/*
Route topp 5 kunder baserat på spenderade pengar.
*/
router.get("/top-customers", auth, adminAuth, async (req, res) => {
  try {
    const result = await Order.aggregate([

/*
Endast slutförda köp.
*/
      { $match: { paymentStatus: "completed" } },
      {
        $group: {

/*
Sortera efter användare.
*/
          _id: "$user",

/*
Räkna ut totalsumma. 
*/
          totalSpent: { $sum: "$totalPrice" },

/*
Antal order per användare. 
*/
          orders: { $sum: 1 },
        },
      },

/*
Sortera efter mest spenderat och begränsa till 5 användare. 
*/
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);

/*
Skicka svaret. 
*/
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta kunddata" });
  }
});

/*
Exportera filen. 
*/
module.exports = router;



