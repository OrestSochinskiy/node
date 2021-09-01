const router = require('express').Router();
const { authMiddlewar } = require('../middlewars');
const { authController } = require('../controllers');

router.post('/', authMiddlewar.isUserPresent, authMiddlewar.valideBody, authController.authUser);

module.exports = router;
