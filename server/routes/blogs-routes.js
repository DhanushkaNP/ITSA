const express = require("express");
const router = express.Router();

router.get("/all", function (req, res, next) {
  res.send("All blogs");
});

router.post("/new", function (req, res, next) {
  res.send("Added new blog post");
});

router.patch("/:bid", function (req, res, next) {
  const blogId = req.params.bid;
  res.send(`blog ${blogId} updated`);
});

router.delete("/:bid", function (req, res, next) {
  const blogId = req.params.bid;
  res.send(`member ${blogId} deleted`);
});

module.exports = router;
