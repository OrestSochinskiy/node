const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND } = require('../config/status');
const message = require('../config/message');
const authValidator = require('../validators/authValidators');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { email } = req.body;

      const currentUser = await User.findOne({ email });

      if (!currentUser) {
        throw new ErrorHandler(NOT_FOUND, message.USER_NOT_FOUND);
      }
      console.log(currentUser);
      req.user = currentUser;
      next();
    } catch (e) {
      next(e);
    }
  },

  valideBody: (req, res, next) => {
    try {
      const { error } = authValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(NOT_FOUND, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
