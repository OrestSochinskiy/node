const { userService } = require('../services');
const passwordService = require('../services/password.service');
const { UPDATED, DELETED } = require('../config/message');
const userNormalizator = require('../utils/userUtil');
const { USER_CREATED, USER_DELETED } = require('../config/status');

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

      const hashPassword = await passwordService.hashPassword(password);

      const user = await userService.createUser({ ...req.body, password: hashPassword });
      const userNormalize = userNormalizator.userNormalizator(user);
      res.json(USER_CREATED, userNormalize);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      const userNormalize = userNormalizator.userNormalizator(user);

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
      res.json(USER_CREATED, UPDATED);
    } catch (e) {
      next(e);
    }
  }
};
