const mongoose = require('mongoose');
const User = require('./user.model');

const getUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('Invalid user id');
    err.statusCode = 400;
    err.isOperational = true;
    throw err;
  }

  const user = await User.findById(userId);

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    err.isOperational = true;
    throw err;
  }

  return user;
};

module.exports = { getUserById };
