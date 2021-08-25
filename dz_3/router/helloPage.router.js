const router = require('express').Router();

const { helloController } = require('../controllers');

router.get('/', helloController.getHelloPage);

module.exports = router;
