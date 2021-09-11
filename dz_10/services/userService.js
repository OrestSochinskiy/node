const User = require('../dataBase/User');

module.exports = {
  findAllUser: () => User.find(),
  findUserById: (id) => User.findById(id),
  createUser: (user) => User.create(user),
  deleteUser: (user_id) => User.findByIdAndDelete(user_id),
  updateUser: (user_id, info) => User.findByIdAndUpdate(user_id, info, { new: true }).lean()
};
