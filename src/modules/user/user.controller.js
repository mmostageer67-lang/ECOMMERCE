const { getUserById,getAllUsers } = require('./user.service');

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
const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserByIdController, getAllUsersController };
