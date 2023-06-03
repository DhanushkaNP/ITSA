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
  tokens: [{ token: { type: String } }],
});

schema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});

schema.pre("findOneAndUpdate", async function (next) {
  const update = this._update;
  if (update.password) {
    const hashedPassword = await bcrypt.hash(update.password, 8);
    this._update.password = hashedPassword;
    next();
  }
  next();
});

schema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) return new Error();

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return new Error();

  return user;
};

schema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: this._id, type: this.type }, jwtPrivateKey);
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

const User = mongoose.model("User", schema);

module.exports = User;
