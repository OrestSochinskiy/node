const Joi = require('joi');
const { CURRENT_YEAR } = require('../config/variables');

const createValidator = Joi.object({
  brand: Joi.string().alphanum().min(2).max(10)
    .trim()
    .required(),
  model: Joi.string().alphanum().min(2).max(10)
    .trim()
    .required(),
  year: Joi.number().min(CURRENT_YEAR - 80).max(CURRENT_YEAR).required(),
  price: Joi.number().min(0).required()
});

const updateValidator = Joi.object({
  price: Joi.number().min(0)
});

module.exports = {
  createValidator,
  updateValidator
};
