const express = require('express');
const { registerController, loginController } = require('./auth.controller');

const router = express.Router();

router.post('/create', registerController);
router.post('/login', loginController);

module.exports = router;
