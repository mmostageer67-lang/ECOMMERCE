const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
    max:200,

    windowMs: 15 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(limiter);

app.use(morgan('combined'));




module.exports = app;
