const User = require('../user/user.model');
const bcrypt = require('bcryptjs');
const registerService = async (userData) => {

  const { name, email, password, role, phone, address } = userData;

  if (!name || !email || !password) {

const err = new Error('Please provide name, email and password');
    err.statusCode = 400;
    err.isOperational = true;
    throw err;
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {

  const err = new Error('email is already exists');
    err.statusCode = 409;
    err.isOperational = true;
    throw err;
  }
 
  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    address,
  });

  return user;
};

const loginService = async (email, password) => {
if (!email || !password) {
    const err = new Error('Please provide email and password');
    err.statusCode = 400;
    err.isOperational = true;
    throw err;
  }
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    const err = new Error('invalid email or password');
    err.statusCode = 401;
    err.isOperational = true;
    throw err;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const err = new Error('invalid email or password');
    err.statusCode = 401;
    err.isOperational = true;
    throw err;
  }
 
  return user;
};

module.exports = { registerService, loginService };
