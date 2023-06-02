const express = require("express");
const router = express.Router();
const memberControllers = require("../controllers/members-controllers");

router.get("/all", memberControllers.getAllMembers);

router.post("/new", memberControllers.createNewMember);

router.patch("/:mid", memberControllers.updateMember);

router.delete("/:mid", memberControllers.deleteMember);

module.exports = router;
