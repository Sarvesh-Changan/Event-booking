const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketshield';

    try {
      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 3000
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (err) {
      console.log(`Failed to connect: ${mongoURI.replace(/\/\/.*@/, '//***@')}`);
    }

    console.warn('⚠️  MongoDB not available. Running in demo mode with mock data.');
    return false;
  } catch (error) {
    console.warn(`MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Running in demo mode.');
    return false;
  }
};

module.exports = connectDB;
