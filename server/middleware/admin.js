module.exports = (req, res, next) => {
  if (req.user.type !== "Admin") return res.status(403).send("Access denied.");
  next();
};
