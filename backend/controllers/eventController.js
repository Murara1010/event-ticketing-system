const { Event, Organizer, Venue, Ticket } = require('../models');

exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [Organizer, Venue]
    });

    const ticketsSold = await Ticket.count({
      where: { eventId: req.params.id }
    });

    const remainingCapacity = event.Venue.capacity - ticketsSold;

    res.json({
      event,
      ticketsSold,
      remainingCapacity
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};