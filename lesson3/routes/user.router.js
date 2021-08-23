const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getSingleUser);
router.put('/:user_id', () => {

});
router.delete('/:user_id', () => {

});

module.exports = router;
