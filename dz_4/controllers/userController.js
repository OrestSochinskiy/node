const { userService } = require('../services');

module.exports = {
  getAllUser: async (req, res) => {
    const AllUsers = await userService.findAllUser();
    res.json(AllUsers);
  }
};
