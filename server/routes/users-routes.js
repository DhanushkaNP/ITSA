const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user-controllers");

router.post("/login", userControllers.userLogin);

router.post("/logout", userControllers.userLogout);

module.exports = router;
