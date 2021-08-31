const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_VALID_DATA } = require('../config/status');
const { WRONG_DATA } = require('../config/message');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  compare: async (hash, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hash);

    if (!isPasswordMatched) {
      throw new ErrorHandler(NOT_VALID_DATA, WRONG_DATA);
    }
  }
};
