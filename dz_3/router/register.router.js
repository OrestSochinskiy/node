const router = require('express').Router();

const { registerController } = require('../controllers');

router.get('/', registerController.getRegisterPage);
router.post('/', registerController.regNewUser);

module.exports = router;
