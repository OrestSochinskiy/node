const router = require('express').Router();
const { authMiddlewar } = require('../middlewars');
const { authController } = require('../controllers');

router.post('/', authMiddlewar.valideBody, authMiddlewar.isUserPresent, authController.authUser);

module.exports = router;
