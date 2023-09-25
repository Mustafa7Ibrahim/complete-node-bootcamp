const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// routes import
const toursRouter = require('./routes/toursRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// routes middleware
app.use('/api/v1/tours', toursRouter);

// export app
module.exports = app;
