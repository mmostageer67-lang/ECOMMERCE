const { registerService } = require('./auth.service');

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

module.exports = { registerController };
