const { userValidator } = require('../validators');
const User = require('../dataBase/User');
const message = require('../config/message');
const ErrorHandler = require('../errors/ErrorHandler');
const {
  NOT_VALID_DATA, NOT_FOUND, FORBIDDEN, EXIST
} = require('../config/status');

module.exports = {
  isUserPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (user) {
        throw new ErrorHandler(EXIST, message.ALREADY_EXIST);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserNotPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(NOT_FOUND, message.USER_NOT_FOUND);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validateCreateUserBody: (req, res, next) => {
    try {
      const { error, value } = userValidator.createValidator.validate(req.body);

      req.body = value;

      if (error) {
        throw new ErrorHandler(NOT_VALID_DATA, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validateNewPassword: (req, res, next) => {
    try {
      const { error, value } = userValidator.passwordValidator.validate(req.body);

      req.body = value;

      if (error) {
        throw new ErrorHandler(NOT_VALID_DATA, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validateUpdateUserBody: (req, res, next) => {
    try {
      const { error } = userValidator.updateValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(NOT_VALID_DATA, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserRoleMiddleware: (rolesArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if (!rolesArr.length) {
        return next();
      }

      if (!rolesArr.includes(role)) {
        throw new ErrorHandler(FORBIDDEN, message.FORBIDDEN);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbFiled]: value });

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
