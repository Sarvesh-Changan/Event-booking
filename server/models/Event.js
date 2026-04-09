const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['comedy', 'cricket', 'music'],
    lowercase: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  vipPrice: { type: Number },
  premiumPrice: { type: Number },
  image: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
  artist: { type: String },
  tags: [String],
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
