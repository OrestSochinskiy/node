const users = require('../db/users');

module.exports = {
  getLoginPage: (req, res) => {
    res.render('login');
  },
  findEmail: (req, res) => {
    const { email, password } = req.body;
    // eslint-disable-next-line eqeqeq
    const userId = users.findIndex((u) => u.email == email && u.password == password);
    if (userId === -1) {
      res.redirect('/register');
    } else {
      res.redirect(`/users/${userId}`);
    }
  }
};
