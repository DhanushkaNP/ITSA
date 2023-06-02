async function getAllEvents(req, res, next) {
  res.send("All Events");
}

async function getEventById(req, res, next) {
  const eventId = req.params.eid;
  res.send(eventId);
}

async function createNewEvent(req, res, next) {
  res.send("Added new Event");
}

async function updateEvent(req, res, next) {
  const EventId = req.params.eid;
  res.send(`Event ${EventId} updated`);
}

async function deleteEvent(req, res, next) {
  const EventId = req.params.eid;
  res.send(`Event ${EventId} deleted`);
}

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.createNewEvent = createNewEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
