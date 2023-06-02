const express = require("express");
const router = express.Router();

router.get("/all", function (req, res, next) {
  res.send("All events");
});

router.get("/:eid", function (req, res, next) {
  const eventId = req.params.eid;
  res.send(eventId);
});

router.post("/new", function (req, res, next) {
  res.send("New event added");
});

router.patch("/:eid", function (req, res, next) {
  const eventId = req.params.eid;
  res.send(`Event ${eventId} updated`);
});

router.delete("/:eid", function (req, res, next) {
  const eventId = req.params.eid;
  res.send(`Event ${eventId} deleted`);
});

module.exports = router;
