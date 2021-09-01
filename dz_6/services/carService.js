const { cars_db } = require('../dataBase');

module.exports = {
  findAllCars: () => cars_db.find(),
  createCar: (car) => cars_db.create(car),
  findCarById: (dbFiled, value) => cars_db.findOne({ [dbFiled]: value }),
  deleteCar: (car_id) => cars_db.deleteOne({ _id: car_id }),
  updateCar: (car_id, data) => cars_db.findByIdAndUpdate({ _id: car_id }, data)
};
