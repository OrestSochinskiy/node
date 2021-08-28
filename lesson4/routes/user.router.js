const router = require('express').Router();

const { isUserPresent, checkUnigueEmail } = require('../middlewares/user.middleware');
const { userController } = require('../controllers');

router.post('/', checkUnigueEmail, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);

module.exports = router;
