const router = require('express').Router();
const { validateAccessToken } = require('../middlewars/authMiddlewar');
const {
  userController: {
    getUserById, createUser, updateUser, deleteUser, getAllUser
  }
} = require('../controllers');
const { USER_ID, PARAMS, _ID } = require('../config/constants');
const {
  userMiddlewar: {
    validateCreateUserBody, validateUpdateUserBody, getUserByDynamicParam,
    isUserPresent,
    isUserNotPresent,
  },
  fileMiddlewar: {
    ckeckAvatar
  }
} = require('../middlewars');

router.get('/', getAllUser);

router.post('/',
  validateCreateUserBody,
  ckeckAvatar,
  getUserByDynamicParam('email'),
  isUserPresent,
  createUser);

router.get('/:user_id',
  getUserByDynamicParam(USER_ID, PARAMS, _ID),
  isUserNotPresent,
  getUserById);

router.delete('/:user_id',
  getUserByDynamicParam(USER_ID, PARAMS, _ID),
  validateAccessToken,
  isUserNotPresent,
  // checkUserRoleMiddleware([ADMIN]),
  deleteUser);

router.put('/:user_id',
  validateUpdateUserBody,
  getUserByDynamicParam(USER_ID, PARAMS, _ID),
  isUserNotPresent,
  updateUser);

module.exports = router;
