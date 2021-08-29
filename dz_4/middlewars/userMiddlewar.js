const User = require('../dataBase/User');
const message = require('../config/message');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const currentUser = await User.findById(user_id);

      if (!currentUser) {
        throw new ErrorHandler(404, message.USER_NOT_FOUND);
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
        throw new ErrorHandler(400, message.ALREADY_EXIST);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  isUserValid: (req, res, next) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        throw new ErrorHandler(400, message.EMPTY_FIELDS);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
