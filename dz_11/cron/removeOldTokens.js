const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { OAuth, ActionTokens } = require('../dataBase');

module.exports = async () => {
  const previousMonth = datJs.utc().subtract(1, 'month');

  console.log(previousMonth);

  const oauthDelete = await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
  const actionDelete = await ActionTokens.deleteMany({ createdAt: { $lte: previousMonth } });

  console.log(oauthDelete);
  console.log(actionDelete);
};
