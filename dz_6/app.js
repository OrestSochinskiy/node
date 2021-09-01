const express = require('express');
const mongoose = require('mongoose');
const { MONGO_CONNECTION } = require('./config/variables');
const { NOT_FOUND } = require('./config/message');
const status = require('./config/status');

require('dotenv').config();

const { PORT } = require('./config/variables');

const app = express();

mongoose.connect(MONGO_CONNECTION);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, authRouter, carRouter } = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('APP LISTEN', PORT);
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || status.NOT_FOUND,
    message: err.message || NOT_FOUND
  });
}

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
  res
    .status(err.status || status.SERVER_ERROR)
    .json({
      message: err.message
    });
}
