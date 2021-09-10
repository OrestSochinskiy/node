const { userService, passwordService, emailService } = require('../services');
const { UPDATED, DELETED } = require('../config/message');
const userNormalizator = require('../utils/userUtil');
const emailActionsEnum = require('../config/email-actions');
const { CREATED, USER_DELETED } = require('../config/status');
const User = require('../dataBase/User');

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await userService.findAllUser(req.body).select('-password');

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hashPassword(password);
      const user = await User.create({ ...req.body, password: hashedPassword });

      const userNormalize = userNormalizator.userNormalizator(user);
      res.json(userNormalize);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { user } = req;

      const userNormalize = userNormalizator.userNormalizator(user);
      await emailService.sendMail('sochinskiyorest@gmail.com', emailActionsEnum.WELCOME, { userName: req.user.name });

      res.json(userNormalize);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteUser(user_id);
      res.json(USER_DELETED, DELETED);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userService.updateUser(user_id, req.body);
      res.json(CREATED, UPDATED);
    } catch (e) {
      next(e);
    }
  }
};
