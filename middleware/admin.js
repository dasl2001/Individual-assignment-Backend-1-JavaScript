module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "admin") {
  /*
  Kontrollerar om  användaren inte är autentiserad).
  Om användaren inte har rollen "admin".
  */

    return res.status(404).json({ message: "Not Found" });
  /*
  Svarar med 404 Not Found, döljer sidan för icke-admins.
  */

  }
  next();
  /*
  Om användaren är en admin, fortsätter vi till nästa middleware.
  */
};


