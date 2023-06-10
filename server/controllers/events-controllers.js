const HttpError = require("../util/http-Error");
const Event = require("../models/event");
const { eventAuthSchema } = require("../util/validator");

async function getAllEvents(req, res, next) {
  let events;
  try {
    events = await Event.find().sort({ _id: -1 });
  } catch (err) {
    return next(
      new HttpError("Something went wrong when finding all events", 500)
    );
  }

  if (events.length === 0) {
    return next(new HttpError("Didn't found any event", 422));
  }

  res.status(200).json({ events });
}

async function getEventById(req, res, next) {
  const eventId = req.params.eid;

  let foundEvent;
  try {
    foundEvent = await Event.findById(eventId);
  } catch (err) {
    return next(
      new HttpError("Didn't found any event related to given id", 404)
    );
  }

  res.status(200).json({ event: foundEvent });
}

async function createNewEvent(req, res, next) {
  const image = "https://www.gstatic.com/webp/gallery/1.jpg";

  let result;
  try {
    result = await eventAuthSchema.validateAsync(req.body);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    return next(
      new HttpError(err.message || "Validation failed", err.status || 401)
    );
  }

  const { title, date, description } = result;

  const createdEvent = new Event({
    title,
    date: new Date(date),
    description,
    image,
  });

  try {
    await createdEvent.save();
  } catch (err) {
    return next(new HttpError("Creating event failed", 500));
  }
  res.send("event created").status(201);
}

async function updateEvent(req, res, next) {
  const eventId = req.params.eid;

  let result;
  try {
    result = await eventAuthSchema.validateAsync(req.body);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    return next(
      new HttpError(err.message || "Validation failed", err.status || 401)
    );
  }
  const { title, date, description } = result;

  let foundEvent;
  try {
    foundEvent = await Event.findById(eventId);
  } catch (err) {
    return next(
      new HttpError("Didn't found any event related to given id", 404)
    );
  }

  foundEvent.title = title;
  foundEvent.date = new Date(date);
  foundEvent.description = description;

  try {
    foundEvent.save();
  } catch (err) {
    return next(
      new HttpError("Didn't updat event,Something went wrong when saving", 500)
    );
  }
  res.send(`Event ${eventId} updated`).status(200);
}

async function deleteEvent(req, res, next) {
  const eventId = req.params.eid;

  try {
    await Event.findByIdAndDelete(eventId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong couldn't delete the event", 500)
    );
  }

  res.status(200).send("Event deleted");
}

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.createNewEvent = createNewEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
