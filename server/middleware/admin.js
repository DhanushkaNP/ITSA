const jwt = require("jsonwebtoken");
const { tokenHeader } = require("../config.json");

module.exports = (req, res, next) => {
  const token = req.header(tokenHeader);
  const user = jwt.decode(token);
  if (user.type !== "Admin") return res.status(403).send("Access denied.");
  next();
};
