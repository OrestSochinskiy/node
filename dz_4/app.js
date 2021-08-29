const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');

const app = express();

mongoose.connect('mongodb://localhost:27017/apr-2021');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter } = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('APP LISTEN', PORT);
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Not found'
  });
}

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message
    });
}
