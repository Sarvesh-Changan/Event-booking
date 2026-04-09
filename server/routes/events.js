const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events — list all events with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/events/:id — get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
