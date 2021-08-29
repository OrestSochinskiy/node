const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddlewar } = require('../middlewars');

router.get('/', userController.getAllUser);
router.post('/', userMiddlewar.isUserValid, userMiddlewar.isEmailUsed, userController.createUser);
router.get('/:user_id', userMiddlewar.isUserPresent, userController.getUserById);
router.delete('/:user_id', userMiddlewar.isUserPresent, userController.deleteUser);
router.put('/:user_id', userMiddlewar.isUserPresent, userMiddlewar.isUserValid, userController.updateUser);

module.exports = router;
