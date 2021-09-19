const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const { MONGO_CONNECTION } = require('./config/variables');
const { NOT_FOUND } = require('./config/message');
const status = require('./config/status');
const ErrorHandler = require('./errors/ErrorHandler');
const { CORS_NOT_ALLOWED } = require('./config/message');
const { FORBIDDEN } = require('./config/status');

const { PORT, ALLOWED_ORIGINS } = require('./config/variables');
const cronJobs = require('./cron');
const { userRouter, authRouter, carRouter } = require('./routes');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECTION);

app.use(helmet());

app.use(cors({ origin: _configureCors }));

app.use(expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.get('/ping', (req, res) => res.json('Pong'));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('APP LISTEN', PORT);

  cronJobs();
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

function _configureCors(origin, callback) {
  const whiteList = ALLOWED_ORIGINS.split(';');

  if (!origin && process.env.NODE_ENV === 'dev') {
    return callback(null, true);
  }

  if (!whiteList.includes(origin)) {
    return callback(new ErrorHandler(FORBIDDEN, CORS_NOT_ALLOWED), false);
  }

  return callback(null, true);
}
