const Message = require("../models/message");
const HttpError = require("../util/http-Error");
const { messageAuthSchema } = require("../util/validator");

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
  let result;
  try {
    result = await messageAuthSchema.validateAsync(req.body);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    return next(
      new HttpError(err.message || "Validation failed", err.status || 401)
    );
  }

  const newMessage = Message(result);

  try {
    await newMessage.save();
  } catch (err) {
    return next(new HttpError("Couldn't create a message", 500));
  }

  res.status(201).send("Message created");
}

async function deleteMessage(req, res, next) {
  const messageId = req.params.mgId;
  let message;
  try {
    message = await Message.findByIdAndDelete(messageId);
  } catch (err) {
    return next(
      new HttpError(
        "Something when went wrong, couldn't find any message realted to given id",
        404
      )
    );
  }

  res.status(200).send("Message deleted");
}

exports.getAllMessages = getAllMessages;
exports.createNewMessage = createNewMessage;
exports.deleteMessage = deleteMessage;
