module.exports = {
  PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/),
  EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
  USER_ID: 'user_id',
  PARAMS: 'params',
  _ID: '_id',
  CAR_ID: 'car_id',
  BODY: 'body',

  PHOTO_MAX_TYPE: 5 * 1024 * 1024,
  MIMETYPES: {
    PHOTO: [
      'image/jpeg',
      'image/png'
    ]
  }
};
