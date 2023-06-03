const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user-controllers");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/login", userControllers.userLogin);
router.post("/logout", auth, userControllers.userLogout);
router.post("/", auth, admin, userControllers.createUser);
router.get("/", auth, admin, userControllers.getUsers);
router.delete("/:id", auth, admin, userControllers.deleteUser);
router.patch("/:id", auth, admin, userControllers.updateUser);

module.exports = router;
