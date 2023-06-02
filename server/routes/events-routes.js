const express = require("express");
const router = express.Router();
const eventControllers = require("../controllers/events-controllers");

router.get("/all", eventControllers.getAllEvents);

router.get("/:eid", eventControllers.getEventById);

router.post("/new", eventControllers.createNewEvent);

router.patch("/:eid", eventControllers.updateEvent);

router.delete("/:eid", eventControllers.deleteEvent);

module.exports = router;
