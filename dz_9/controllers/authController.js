const passwordService = require('../services/password.service');
const jwtService = require('../services/jwt.service');
const { userNormalizator: { userNormalizator } } = require('../utils');
const { OK } = require('../config/message');
const { AUTHORIZATION } = require('../config/message');
const actionTokenEnum = require('../config/action-tokens.enum');
const { emailService } = require('../services');
const { ActionTokens, user_db } = require('../dataBase');
const emailActionEnum = require('../config/email-actions');
const { FROTEND_URL } = require('../config/variables');
const OAuth = require('../dataBase/OAuth');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      user.method();

      await passwordService.compare(user.password, password);

      const tokenPair = jwtService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: user.id });

      res.json({
        ...tokenPair,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },

  logoutUser: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      await OAuth.deleteOne({ access_token });

      res.json(OK);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);
      const user = req.loginUser;
      await OAuth.deleteOne({ refresh_token });

      const tokenPair = jwtService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: user.id });

      res.json({
        ...tokenPair,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },

  sendEmailForgotPassword: async (req, res, next) => {
    try {
      const { user } = req;

      const actionToken = jwtService.generateActionToken(actionTokenEnum.FORGOT_PASS);

      await ActionTokens.create({ token: actionToken, user: user._id });

      await emailService.sendMail('sochinskiyorest@gmail.com',
        emailActionEnum.FORGOT_PASSWORD,
        { userName: user.name, forgotPasswordURL: `${FROTEND_URL}/password?token=${actionToken}` });

      res.json('OKAY');
    } catch (e) {
      next(e);
    }
  },

  setNewForgotPassword: async (req, res, next) => {
    try {
      const { loginUser: { _id }, body: { password } } = req;

      const token = req.get(AUTHORIZATION);
      const hashPassword = await passwordService.hashPassword(password);

      await user_db.findByIdAndUpdate(_id, { password: hashPassword });
      await ActionTokens.deleteOne({ token });
      await OAuth.deleteMany({ user: _id });

      res.json('OK');
    } catch (e) {
      next(e);
    }
  }

};
