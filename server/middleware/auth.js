const jwt = require("jsonwebtoken");
const { tokenHeader } = require("../config.json");

module.exports = function (req, res, next) {
  const token = req.header(tokenHeader);
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
