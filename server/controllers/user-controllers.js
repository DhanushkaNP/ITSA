const User = require("../models/user");
const { tokenHeader } = require("../config.json");

async function userLogin(req, res, next) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).send("Invalid email or password!");
  }
}

async function userLogout(req, res, next) {
  try {
    const token = req.header(tokenHeader);
    const user = await User.findOneAndUpdate(
      { "tokens.token": token },
      { $pull: { tokens: { token } } },
      { new: true }
    );
    if (!user) return res.status(404).send("User or token not found");
    res.status(200).send("Token removed successfully.");
  } catch (error) {
    return res.status(404).send("User or token not found");
  }
}

async function createUser(req, res, next) {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("Email is already used!");
  try {
    const user = new User({ email, password, type: "Moderator" });
    await user.save();
    res.status(201).json({ _id: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const deletedUser = await User.findOneAndDelete({
      _id: id,
      type: { $ne: "Admin" },
    });
    if (!deletedUser) return res.status(404).send("User not found!");
    return res.status(200).send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const { email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, password },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send("User not found!");
    return res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find({ type: "Moderator" });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.userLogin = userLogin;
exports.userLogout = userLogout;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getUsers = getUsers;
