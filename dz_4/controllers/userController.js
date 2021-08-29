const { userService } = require('../services');

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await userService.findAllUser(req.body);

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const createdUser = await userService.createUser(req.body);

      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  getUserById: (req, res, next) => {
    try {
      res.json(req.user);
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
