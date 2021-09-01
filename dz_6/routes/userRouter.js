const router = require('express').Router();
const { userController } = require('../controllers');
const {
  userMiddlewar: {
    isUserPresent, isEmailUsed, checkUserRoleMiddleware, validateCreateUserBody, validateUpdateUserBody, getUserByDynamicParam
  }
} = require('../middlewars');

router.get('/', userController.getAllUser);

router.post('/', validateCreateUserBody,
  isEmailUsed, userController.createUser);

router.get('/:user_id',
  getUserByDynamicParam('user_id', 'params', '_id'),
  userController.getUserById);

router.delete('/:user_id', isUserPresent, checkUserRoleMiddleware(['admin']), userController.deleteUser);

router.put('/:user_id', validateUpdateUserBody, isUserPresent, userController.updateUser);

module.exports = router;
