const express = require("express");
const router = express.Router();
const messageControllers = require("../controllers/message-controllers");

router.get("/all", messageControllers.getAllMessages);

router.post("/new", messageControllers.createNewMessage);

module.exports = router;
