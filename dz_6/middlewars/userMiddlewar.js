const userValidator = require('../validators/userValidators');
const User = require('../dataBase/User');
const message = require('../config/message');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_VALID_DATA, NOT_FOUND } = require('../config/status');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const currentUser = await User.findById(user_id).select('-password');

      if (!currentUser) {
        throw new ErrorHandler(NOT_FOUND, message.USER_NOT_FOUND);
      }

      req.user = currentUser;
      next();
    } catch (e) {
      next(e);
    }
  },

  isEmailUsed: async (req, res, next) => {
    try {
      const { email } = req.body;

      const isEmailUsed = await User.findOne({ email });

      if (isEmailUsed) {
        throw new ErrorHandler(NOT_VALID_DATA, message.ALREADY_EXIST);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  validateCreateUserBody: (req, res, next) => {
    try {
      const { error } = userValidator.createValidator.validate(req.body);

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
  }
};
