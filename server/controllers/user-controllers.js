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
      { tokens: { $in: [token] } },
      { $pull: { tokens: token } },
      { new: true }
    );
    if (!user) return res.status(404).send("User or token not found");
    res.status(200).send("Token removed successfully.");
  } catch (error) {
    return res.status(404).send("User or token not found");
  }
}

exports.userLogin = userLogin;
exports.userLogout = userLogout;
