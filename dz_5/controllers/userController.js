const { userService } = require('../services');
const passwordService = require('../services/password.service');

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

      await userService.createUser({ ...req.body, password: hashPassword });

      res.json('created');
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.findUserById(req.params.user_id).select('-password');
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteUser(user_id);
      res.json('Deleted');
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userService.updateUser(user_id, req.body);

      res.json('Update');
    } catch (e) {
      next(e);
    }
  }
};
