const mongoose = require("mongoose");

/**
 * Interface
 *  - title
 *  - description
 *  - image(s)
 *  - owner
 */

const schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 150 },
  description: { type: String, required: true, maxlength: 1000 },
  image: { type: String, required: true },
  owner: { type: String, required: true, maxlength: 100 },
});

const Blog = mongoose.model("Blog", schema);

module.exports = Blog;
