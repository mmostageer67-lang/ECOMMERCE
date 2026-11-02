const express = require('express');
const authMiddleware = require('../../middlewares/authMidleware');
const { getUserByIdController } = require('./user.controller');

const router = express.Router();

router.get('/:id', authMiddleware, getUserByIdController);

module.exports = router;
