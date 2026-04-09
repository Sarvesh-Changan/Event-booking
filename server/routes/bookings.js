const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// POST /api/bookings — create a new booking
router.post('/', async (req, res) => {
  try {
    const { eventId, userId, userName, email, phone, tickets, ticketType, totalAmount } = req.body;

    // Check event capacity
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.bookedSeats + tickets > event.totalSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({
      eventId,
      userId,
      userName,
      email,
      phone,
      tickets,
      ticketType,
      totalAmount
    });

    const savedBooking = await booking.save();

    // Update booked seats
    event.bookedSeats += tickets;
    await event.save();

    // Populate event details
    const populatedBooking = await Booking.findById(savedBooking._id).populate('eventId');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings/user/:userId — get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('eventId')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings/:id — get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('eventId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
