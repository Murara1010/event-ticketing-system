const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { Event, Organizer, Venue, Attendee, Ticket } = require('./models');



const app = express();
app.use(cors());
app.use(express.json());


// CREATE TABLE
sequelize.sync()

// GET EVENTS (FROM DATABASE)
app.get('/api/events', async (req, res) => {
  const events = await Event.findAll({
    include: [
      Organizer,
      Venue,
      Ticket
    ]
  });

  const result = events.map(event => {
    const ticketsSold = event.Tickets.length;
    const capacity = event.Venue?.capacity || 0;

    return {
      id: event.id,
      name: event.name,
      organizer: event.Organizer?.name,
      venue: event.Venue?.name,
      capacity,
      ticketsSold,
      remaining: capacity - ticketsSold
    };
  });

  res.json(result);
});
//---------------------API Layer (Express) Routes handle the requests:---------------------//
// ADD EVENT (FROM DATABASE)
app.post('/api/events', async (req, res) => {
  try {
    const { name, organizerName, venueName, capacity } = req.body;

    const organizer = await Organizer.create({ name: organizerName });
    const venue = await Venue.create({ name: venueName, capacity });

    const event = await Event.create({
      name,
      OrganizerId: organizer.id,
      VenueId: venue.id
    });

    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ADD TICKET ROUTE (FROM DATABASE)
app.post('/api/tickets', async (req, res) => {
  try {
    const { name, email, eventId } = req.body;

    //  GET EVENT WITH TICKETS + VENUE
    const event = await Event.findByPk(eventId, {
      include: [Venue, Ticket]
    });

    //  PREVENT OVERBOOKING
    if (event.Tickets.length >= event.Venue.capacity) {
      return res.status(400).json({ error: "Event is full" });
    }

    // CREATE ATTENDEE
    const attendee = await Attendee.create({ name, email });

    // CREATE TICKET
    const ticket = await Ticket.create({
      EventId: eventId,
      AttendeeId: attendee.id,
      price: 10
    });

    res.json(ticket);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE EVENT
app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, () => console.log('Server running on 5000'));