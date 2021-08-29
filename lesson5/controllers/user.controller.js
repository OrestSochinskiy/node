const User = require('../dataBase/User');

module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      const { user, testParam } = req;

      // eslint-disable-next-line no-console
      console.log(user);
      // eslint-disable-next-line no-console
      console.log('-------------------------------------------------');
      // eslint-disable-next-line no-console
      console.log(testParam);
      // eslint-disable-next-line no-console
      console.log('-------------------------------------------------');

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: () => {

  },
  createUser: async (req, res, next) => {
    try {
      const createdUser = await User.create(req.body);

      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await User.deleteOne({ _id: user_id });

      res.status(204).json(`User deleted ${user_id}`);
    } catch (e) {
      next(e);
    }
  }
};
