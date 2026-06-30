const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();

const limiter = rateLimit({
    max: 5,

    windowMs: 15 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(sanitize());
app.use(xss());
app.use(hpp());
app.use(limiter);

app.use(morgan('dev'));




module.exports = app;
