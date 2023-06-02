async function userLogin(req, res, next) {
  res.send("User logged in.");
}

async function userLogout(req, res, next) {
  res.send("User logged out.");
}

exports.userLogin = userLogin;
exports.userLogout = userLogout;
