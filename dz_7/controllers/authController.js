const passwordService = require('../services/password.service');
const jwtService = require('../services/jwt.service');
const { userNormalizator: { userNormalizator } } = require('../utils');
const OAuth = require('../dataBase/OAuth');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

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

};
