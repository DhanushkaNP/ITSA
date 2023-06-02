const mongoose = require("mongoose");

/**
 * Interface
 *  - title
 *  - date
 *  - description
 *  - image(s)
 */

const schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 150 },
  date: { type: Date, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  image: { type: String, required: true },
});

const Event = mongoose.model("Event", schema);

module.exports = Event;
