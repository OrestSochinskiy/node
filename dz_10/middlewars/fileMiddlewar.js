const ErrorHandler = require('../errors/ErrorHandler');
const { BIG_FILE } = require('../config/message');
const { NOT_VALID_DATA } = require('../config/status');
const { PHOTO_MAX_TYPE, MIMETYPES } = require('../config/constants');

module.exports = {
  ckeckAvatar: (req, res, next) => {
    try {
      if (!req.files || !req.files.avatar) {
        next();
        return;
      }
      const { size, mimetype } = req.files.avatar;

      if (size > PHOTO_MAX_TYPE) {
        throw new ErrorHandler(NOT_VALID_DATA, BIG_FILE);
      }

      if (!MIMETYPES.PHOTO.includes(mimetype)) {
        throw new ErrorHandler(NOT_VALID_DATA, BIG_FILE);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
