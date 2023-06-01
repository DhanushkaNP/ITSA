const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  res.send("User logged in.");
});

router.post("/logout", async (req, res) => {
  res.send("User logged out.");
});

module.exports = router;
