const { userService } = require('../services');
const passwordService = require('../services/password.service');
const { UPDATED, DELETED } = require('../config/message');

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
      res.json(`name: ${user.name} || email : ${user.email} `);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      // const user = await userService.findUserById(req.params.user_id);
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteUser(user_id);
      res.json(DELETED);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userService.updateUser(user_id, req.body);

      res.json(UPDATED);
    } catch (e) {
      next(e);
    }
  }
};
