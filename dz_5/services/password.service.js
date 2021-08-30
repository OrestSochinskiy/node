const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_DATA } = require('../config/message');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  compare: async (hash, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hash);

    if (!isPasswordMatched) {
      throw new ErrorHandler(400, WRONG_DATA);
    }

    return true;
  }
};
