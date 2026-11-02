const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/user/user.routes');
const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);

module.exports = router;
