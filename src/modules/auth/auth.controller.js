const { registerService, loginService } = require('./auth.service');
const generateToken = require('../../utils/generateToken');

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    const user = await registerService({ name, email, password, role, phone, address });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      },
    });
  } catch (err) {
   next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerController, loginController };
