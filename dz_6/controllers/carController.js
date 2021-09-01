const { SUCCESS } = require('../config/status');
const {
  carService: {
    findAllCars, createCar, deleteCar, updateCar
  }
} = require('../services');
const { carNormalizator: { carNormalizator } } = require('../utils');

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const cars = await findAllCars(req.body);

      const carsNormalize = cars.map((car) => carNormalizator(car));

      res.status(SUCCESS).json(carsNormalize);
    } catch (e) {
      next(e);
    }
  },
  createCar: async (req, res, next) => {
    try {
      const car = await createCar(req.body);

      const carNormalize = carNormalizator(car);

      res.status(SUCCESS).json(carNormalize);
    } catch (e) {
      next(e);
    }
  },
  findCarById: (req, res, next) => {
    try {
      const carNormalize = carNormalizator(req.car);

      res.status(SUCCESS).json(carNormalize);
    } catch (e) {
      next(e);
    }
  },
  deleteCar: async (req, res, next) => {
    try {
      await deleteCar(req.params.car_id);

      res.status(SUCCESS).json('deleted');
    } catch (e) {
      next(e);
    }
  },
  updateCar: async (req, res, next) => {
    try {
      await updateCar(req.params.car_id, req.body);

      res.status(SUCCESS).json('updated');
    } catch (e) {
      next(e);
    }
  },

};
