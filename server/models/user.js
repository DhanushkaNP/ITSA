const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

schema.pre("save", async (next) => {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

schema.static.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return new Error();

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return new Error();

  return user;
};

schema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id, type: this.type }, jwtPrivateKey);
  return token;
};

const User = mongoose.model("User", schema);

module.exports = User;
