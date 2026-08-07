const User = require('../user/user.model');

const registerService = async (userData) => {
  const { name, email, password, role, phone, address } = userData;
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const err = new Error('User with this email already exists');
    err.status = 'fail';
    err.statusCode = 409;
    err.isOperational = true;
    throw err;
  }
 
  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role,
    phone,
    address,
  });

return user;
};

module.exports = { registerService };
