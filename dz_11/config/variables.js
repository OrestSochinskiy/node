module.exports = {
  PORT: process.env.PORT || 5002,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/apr-2021',
  CURRENT_YEAR: new Date().getFullYear(),

  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'S_2',
  FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'secretForgot',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'dsadsada@gmail.com',
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1212',

  FROTEND_URL: process.env.FROTEND_URL || 'https://nodejs.org/dist/latest-v8.x/docs/api/process.html',

  AWS_S3_NAME: process.env.AWS_S3_NAME || '',
  AWS_S3_NAME_REGION: process.env.AWS_S3_NAME_REGION || '',
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',
};
