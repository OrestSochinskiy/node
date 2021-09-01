const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND_MESSAGE } = require('../config/message');
const { NOT_FOUND } = require('../config/status');
const { NOT_VALID_DATA } = require('../config/status');
const { carValidator: { createValidator, updateValidator } } = require('../validators');
const { carService: { findCarById } } = require('../services');

module.exports = {
  validateCreateCarsBody: (req, res, next) => {
    try {
      const { error } = createValidator.validate({ ...req.body });

      if (error) {
        throw new ErrorHandler(NOT_VALID_DATA, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  validateUpdateCarsBody: (req, res, next) => {
    try {
      const { error } = updateValidator.validate({ ...req.body });

      if (error) {
        throw new ErrorHandler(NOT_VALID_DATA, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  getCarByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const car = await findCarById(dbFiled, value);

      if (!car) {
        throw new ErrorHandler(NOT_FOUND, NOT_FOUND_MESSAGE);
      }

      req.car = car;

      next();
    } catch (e) {
      next(e);
    }
  }

};
