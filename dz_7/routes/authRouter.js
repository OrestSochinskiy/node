const router = require('express').Router();
const { authMiddlewar: { valideBody }, userMiddlewar: { getUserByDynamicParam, isUserNotPresent } } = require('../middlewars');
const { authController } = require('../controllers');

router.post('/', valideBody, getUserByDynamicParam('email'), isUserNotPresent, authController.authUser);

module.exports = router;
