const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const router = express.Router();

router.use('/v1/auth', authRoutes);

module.exports = router;