module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: () => {

  },
  createUser: (req, res) => {
    res.json('OKAY');
  }
};
