const express = require('express');
const authMiddleware = require('../../middlewares/authMidleware');
const roleMidlleware = require('../../middlewares/authorizeRole');
const { getUserByIdController,getAllUsersController } = require('./user.controller');

const router = express.Router();

router.get('/:id', authMiddleware, getUserByIdController);
router.get('/', authMiddleware,roleMidlleware(['admin']), getAllUsersController);
module.exports = router;
