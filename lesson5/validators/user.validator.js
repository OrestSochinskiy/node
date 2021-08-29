const Joi = require('joi');
const { CURRENT_YEAR, EMAIL_REGEXP, PASSWORD_REGEXP } = require('../config/constants');
const userRolesEnum = require('../config/user-roles.enum');

const girlsValidator = Joi.object({
  name: Joi.string(),
  age: Joi.number().min(15).max(60)
});

const createUserValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30)
    .required()
    .trim(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
  born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
  email: Joi.string().regex(EMAIL_REGEXP).required(),
  role: Joi.string().allow(...Object.values(userRolesEnum)),

  car: Joi.boolean(),

  girl: Joi.array().items(girlsValidator).when('car', { is: true, then: Joi.required() })
});

// eslint-disable-next-line no-unused-vars
const updateUserValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().regex(EMAIL_REGEXP)
});

module.exports = {
  createUserValidator
};
