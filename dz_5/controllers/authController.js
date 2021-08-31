const passwordService = require('../services/password.service');
const { WELCOME } = require('../config/message');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { user, body } = req;
      console.log(user.password, body.password);
      await passwordService.compare(user.password, body.password);

      res.json(WELCOME);
      next();
    } catch (e) {
      next(e);
    }
  }
};
