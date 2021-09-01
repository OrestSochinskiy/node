const router = require('express').Router();
const { userController } = require('../controllers');
const { USER_ID, PARAMS, _ID } = require('../config/constants');
const { ADMIN } = require('../config/user-roles.enum');
const {
  userMiddlewar: {
    isEmailUsed, checkUserRoleMiddleware, validateCreateUserBody, validateUpdateUserBody, getUserByDynamicParam
  }
} = require('../middlewars');

router.get('/', userController.getAllUser);

router.post('/', validateCreateUserBody,
  isEmailUsed, userController.createUser);

router.get('/:user_id',
  getUserByDynamicParam(USER_ID, PARAMS, _ID),
  userController.getUserById);

router.delete('/:user_id',
  getUserByDynamicParam(USER_ID, PARAMS, _ID),
  checkUserRoleMiddleware([ADMIN]),
  userController.deleteUser);

router.put('/:user_id',
  validateUpdateUserBody,
  getUserByDynamicParam(USER_ID, PARAMS, _ID),
  userController.updateUser);

module.exports = router;
