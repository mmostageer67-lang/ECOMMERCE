const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./modules/auth/auth.routes');
const hpp = require('hpp');
const errorMiddleware = require('./middlewares/errorMiddleware');
const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
    max:200,

    windowMs: 15 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(express.json({limit: '10kb'}));
app.use(helmet());
app.use(hpp());
app.use(limiter);
mongoose.set('sanitizeFilter', true);
app.use(morgan('combined'));
app.use('/api/v1/auth', authRoutes);
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

module.exports = app;
