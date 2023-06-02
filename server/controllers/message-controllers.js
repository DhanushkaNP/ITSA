async function getAllMessages(req, res, next) {
  res.send("All Messages");
}

async function createNewMessage(req, res, next) {
  res.send("Added new Message");
}

exports.getAllMessages = getAllMessages;
exports.createNewMessage = createNewMessage;
