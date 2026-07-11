const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.PROD_MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MongoDB URI not defined — set PROD_MONGODB_URI or MONGODB_URI in .env');
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });
}

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

module.exports = connectDB;
