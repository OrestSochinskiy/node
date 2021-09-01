module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/apr-2021',
  CURRENT_YEAR: new Date().getFullYear()
};
