const { userService, passwordService, emailService } = require('../services');
const { UPDATED, DELETED } = require('../config/message');
const userNormalizator = require('../utils/userUtil');
const emailActionsEnum = require('../config/email-actions');
const { CREATED, USER_DELETED } = require('../config/status');
const User = require('../dataBase/User');
const { s3Service } = require('../services');

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
      let user = await User.create({ ...req.body, password: hashedPassword });

      if (req.files) {
        const sendData = await s3Service.uploadFile(req.files.avatar, 'users', user._id);
        user = await User.findByIdAndUpdate(user._id, { avatar: sendData.Location }, { new: true });
      }

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
