const passwordService = require('../services/password.service');
const { WELCOME } = require('../config/message');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { user, body } = req;
      await passwordService.compare(user.password, body.password);
      res.json(WELCOME);
    } catch (e) {
      next(e);
    }
  }
};
