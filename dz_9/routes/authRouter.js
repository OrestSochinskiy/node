const router = require('express').Router();
const {
  authMiddlewar: {
    valideBody, validateAccessToken, validateRefreshToken, validateActionToken
  },
  userMiddlewar: { getUserByDynamicParam, isUserNotPresent, validateNewPassword }
} = require('../middlewars');
const { authController } = require('../controllers');
const actionTokensEnum = require('../config/action-tokens.enum');

router.post('/', valideBody, getUserByDynamicParam('email'), isUserNotPresent, authController.authUser);

router.post('/logout', validateAccessToken, authController.logoutUser);

router.post('/refresh', validateRefreshToken, authController.refresh);

router.post('/password/forgot/send',
  getUserByDynamicParam('email'),
  isUserNotPresent,
  authController.sendEmailForgotPassword);

router.post('/password/forgot/set',
  validateNewPassword,
  validateActionToken(actionTokensEnum.FORGOT_PASS),
  authController.setNewForgotPassword);

module.exports = router;
