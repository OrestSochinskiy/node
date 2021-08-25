const users = require('../db/users');

module.exports = {
  getUserPage: (req, res) => {
    res.render('allUsers', { users });
  },
  getSingleUser: (req, res) => {
    const { userId } = req.params;
    const currentUser = users[userId];
    res.render('userInfo', { currentUser });
  }
};
