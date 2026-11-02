const { getUserById } = require('./user.service');

const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserByIdController };
