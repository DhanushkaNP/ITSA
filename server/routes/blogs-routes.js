const express = require("express");
const blogController = require("../controllers/blogs-controllers");
const router = express.Router();

router.get("/all", blogController.getAllBlogs);

router.post("/new", blogController.createNewBlog);

router.patch("/:bid", blogController.updateBlog);

router.delete("/:bid", blogController.deleteBlog);

module.exports = router;
