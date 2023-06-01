const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtPrivateKey = process.env.JWT_SECRET;

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  type: {
    type: String,
    required: true,
    maxlength: 15,
  },
});

schema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id, type: this.type }, jwtPrivateKey);
  return token;
};

const User = mongoose.model("User", schema);

module.exports = User;
