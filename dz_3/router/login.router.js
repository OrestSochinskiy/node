const router = require('express').Router();

const { loginController } = require('../controllers');

router.get('/', loginController.getLoginPage);
router.post('/', loginController.findEmail);

module.exports = router;
