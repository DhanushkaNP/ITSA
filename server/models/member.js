const mongoose = require("mongoose");

/**
 * Interface
 *  - name
 *  - position
 *  - description
 *  - image(s)
 */

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Member = mongoose.model("Member", schema);

module.exports = Member;
