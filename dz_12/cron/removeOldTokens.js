const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { OAuth, ActionTokens } = require('../dataBase');

module.exports = async () => {
  const previousMonth = datJs.utc().subtract(1, 'month');

  await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
  await ActionTokens.deleteMany({ createdAt: { $lte: previousMonth } });
};
