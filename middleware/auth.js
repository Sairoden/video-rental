const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided");

    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
};
