const Event = require('./Event');
const Organizer = require('./Organizer');
const Venue = require('./Venue');
const Attendee = require('./Attendee');
const Ticket = require('./Ticket');


// RELATIONSHIPS
Event.belongsTo(Organizer);
Organizer.hasMany(Event);

Event.belongsTo(Venue);
Venue.hasMany(Event);

// Event ↔ Ticket
Event.hasMany(Ticket);
Ticket.belongsTo(Event);

// Attendee ↔ Ticket
Attendee.hasMany(Ticket);
Ticket.belongsTo(Attendee);

module.exports = {
  Event,
  Organizer,
  Venue,
  Attendee,
  Ticket
};