const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND } = require('../config/status');
const message = require('../config/message');
const authValidator = require('../validators/authValidators');
const OAuth = require('../dataBase/OAuth');
const { verifyToken } = require('../services/jwt.service');
const { NOT_TOKEN } = require('../config/status');
const { AUTHORIZATION } = require('../config/message');
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
  },

  validateAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      if (!access_token) {
        throw new ErrorHandler(NOT_TOKEN, message.NOT_TOKEN);
      }

      await verifyToken(access_token);

      const tokenFromDB = await OAuth.findOne({ access_token }).populate('user');

      // eslint-disable-next-line no-console
      console.log(tokenFromDB);

      if (!tokenFromDB) {
        throw new ErrorHandler(NOT_TOKEN, message.NOT_TOKEN);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
