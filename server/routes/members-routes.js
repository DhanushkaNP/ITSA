const express = require("express");
const router = express.Router();

router.get("/all", function (req, res, next) {
  res.send("All members");
});

router.post("/new", function (req, res, next) {
  res.send("New member added");
});

router.patch("/:mid", function (req, res, next) {
  const memberId = req.params.mid;
  res.send(`member ${memberId} updated`);
});

router.delete("/:mid", function (req, res, next) {
  const memberId = req.params.mid;
  res.send(`member ${memberId} deleted`);
});

module.exports = router;
