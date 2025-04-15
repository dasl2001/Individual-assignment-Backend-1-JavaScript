const jwt = require("jsonwebtoken");


/*
Hämtar token från Authorization-headern.
Verifierar token med hemlig nyckel (JWT_SECRET).
Om token är okej sparar användarinfo i req.user och går vidare (next()).
Om token saknas eller är fel så svarar vi med 404 Not Found.
*/
module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
};
