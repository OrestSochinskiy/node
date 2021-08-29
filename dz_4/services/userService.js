const User = require('../dataBase/User');

module.exports = {
  findAllUser: () => User.find(),
  createUser: (user) => User.create(user),
  deleteUser: (user_id) => User.findByIdAndDelete(user_id),
  updateUser: (user_id, info) => User.findByIdAndUpdate(user_id, info)
};
