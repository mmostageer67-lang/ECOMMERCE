const express = require('express');
const { registerController } = require('./auth.controller');

const router = express.Router();

router.post('/create', registerController);

module.exports = router;
