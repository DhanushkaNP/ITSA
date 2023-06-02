const express = require("express");
const router = express.Router();

router.get("/all", function (req, res, next) {
  res.send("All messages");
});

router.post("/new", function (req, res, next) {
  res.send("message received");
});

module.exports = router;
