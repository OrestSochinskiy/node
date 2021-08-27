const express = require('express');

const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, authRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Not found'
  });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message
    });
}
