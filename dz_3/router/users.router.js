const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getUserPage);
router.get('/:userId', userController.getSingleUser);

module.exports = router;
