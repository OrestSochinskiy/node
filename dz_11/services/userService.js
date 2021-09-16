const { user_db } = require('../dataBase');

module.exports = {
  findAllUser: () => user_db.find(),
  findUserById: (id) => user_db.findById(id),
  createUser: (user) => user_db.create(user),
  deleteUser: (user_id) => user_db.findByIdAndDelete(user_id),
  updateUser: (user_id, info) => user_db.findByIdAndUpdate(user_id, info, { new: true }).lean()
};
