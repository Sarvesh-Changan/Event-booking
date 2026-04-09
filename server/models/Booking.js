const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  tickets: { type: Number, required: true, min: 1 },
  ticketType: { 
    type: String, 
    enum: ['standard', 'vip', 'premium'], 
    default: 'standard' 
  },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'confirmed' 
  },
  orderId: { type: String },
  bookingDate: { type: Date, default: Date.now }
});

// Generate a unique order ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = '#TS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
