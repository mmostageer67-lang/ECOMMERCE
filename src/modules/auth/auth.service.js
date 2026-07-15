const User = require('../user/user.model');

const registerService = async (userData) => {
  const { name, email, password, role, phone, address } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
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

module.exports = { registerService };
