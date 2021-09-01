const router = require('express').Router();
const { PARAMS } = require('../config/constants');
const { CAR_ID, _ID, BODY } = require('../config/constants');
const { carMiddlewar: { validateCreateCarsBody, getCarByDynamicParam, validateUpdateCarsBody } } = require('../middlewars');
const {
  carController: {
    getAllCars, createCar, findCarById, deleteCar, updateCar
  }
} = require('../controllers');

router.get('/', getAllCars);
router.post('/', validateCreateCarsBody, createCar);
router.get('/:car_id', getCarByDynamicParam(CAR_ID, BODY, _ID), findCarById);
router.delete('/:car_id', getCarByDynamicParam(CAR_ID, BODY, _ID), deleteCar);
router.put('/:car_id', validateUpdateCarsBody, getCarByDynamicParam(CAR_ID, PARAMS, _ID), updateCar);

module.exports = router;
