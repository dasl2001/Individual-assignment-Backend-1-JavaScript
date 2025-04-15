module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(404).json({ message: "Not Found" });
  }
  next();
};


