const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
    max: 5,

    windowMs: 15 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use(morgan('dev'));




module.exports = app;
