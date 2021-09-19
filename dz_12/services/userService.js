const user_db = require('../dataBase/User');

module.exports = {
  findAllUser: () => user_db.find(),
  findUserById: (id) => user_db.findById(id),
  createUser: (user) => user_db.create(user),
  deleteUser: (user_id) => user_db.findByIdAndDelete(user_id),
  updateUser: (user_id, info) => user_db.findByIdAndUpdate(user_id, info, { new: true }).lean(),
  getAll: async (query = {}) => {
    const {
      perPage = 10,
      page = 1,
      sortBy = 'createdAt',
      order = 'asc',
      // eslint-disable-next-line no-unused-vars
      ...filters
    } = query;

    const orderBy = order === 'asc' ? 1 : -1;
    const users = await user_db.find().sort({ [sortBy]: orderBy }).limit(+perPage).skip((page - 1) * perPage);

    return users;
  }
};
