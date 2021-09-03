const jwt = require('jsonwebtoken');
const util = require('util');
const ErrorHandler = require('../errors/ErrorHandler');
const { INVALID_TOKEN } = require('../config/message');
const { NOT_TOKEN } = require('../config/message');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/variables');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      await verifyPromise(token, secret, {});
    } catch (e) {
      throw new ErrorHandler(NOT_TOKEN, INVALID_TOKEN);
    }
  }
};
