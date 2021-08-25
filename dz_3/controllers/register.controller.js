const users = require('../db/users');

const writeUser = require('../services/users.services');

module.exports = {
  getRegisterPage: (req, res) => {
    res.render('register');
  },
  regNewUser: (req, res) => {
    const { email } = req.body;
    // eslint-disable-next-line eqeqeq
    const emailIsFound = users.find((u) => u.email == email);
    if (!emailIsFound) {
      users.push(req.body);
      writeUser.writeUser();
      res.redirect('/login');
      return;
    }
    if (emailIsFound) {
      res.redirect('/login');
    }
  }
};
