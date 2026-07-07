const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.PROD_MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not defined');
  }

  await mongoose.connect(uri);
}

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
});


mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

module.exports = connectDB;
