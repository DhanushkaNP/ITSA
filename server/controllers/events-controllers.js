const HttpError = require("../../../../../Courses/Udemy courses/React, NodeJS, Express and MongoDB - The MERN Fullstack Guide/Main project file/share-places/BACKEND/models/http-error");
const Event = require("../models/event");

async function getAllEvents(req, res, next) {
  res.send("All Events");
}

async function getEventById(req, res, next) {
  const eventId = req.params.eid;
  res.send(eventId);
}

async function createNewEvent(req, res, next) {
  const image = "https://www.gstatic.com/webp/gallery/1.jpg";
  const { title, date, description } = req.body;

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
  res.send("event created").status(200);
}

async function updateEvent(req, res, next) {
  const eventId = req.params.eid;
  const { title, date, description } = req.body;

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
  res.send(`Event ${eventId} updated`);
}

async function deleteEvent(req, res, next) {
  const EventId = req.params.eid;
  res.status(200).send("Event updated");
}

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.createNewEvent = createNewEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
