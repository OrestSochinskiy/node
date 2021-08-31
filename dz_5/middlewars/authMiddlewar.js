const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND } = require('../config/status');
const message = require('../config/message');
const authValidator = require('../validators/authValidators');
const { WRONG_DATA } = require('../config/message');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { email } = req.body;
      const currentUser = await User.findOne({ email });

      if (!currentUser) {
        throw new ErrorHandler(NOT_FOUND, message.USER_NOT_FOUND);
      }
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
        throw new ErrorHandler(NOT_FOUND, WRONG_DATA);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
