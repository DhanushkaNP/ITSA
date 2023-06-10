const Message = require("../models/message");
const HttpError = require("../util/http-Error");

async function getAllMessages(req, res, next) {
  let allMessage;
  try {
    allMessage = await Message.find().sort({ _id: -1 });
  } catch (err) {
    return next(
      new HttpError("Something went wrong when finding all messages", 500)
    );
  }
  res.status(200).json({ allMessage });
}

async function createNewMessage(req, res, next) {
  const { name, email, phone, message } = req.body;

  const newMessage = Message({
    name,
    email,
    phone,
    message,
  });

  try {
    await newMessage.save();
  } catch (err) {
    return next(new HttpError("Couldn't create a message", 500));
  }

  res.status(201).send("Message created");
}

exports.getAllMessages = getAllMessages;
exports.createNewMessage = createNewMessage;
