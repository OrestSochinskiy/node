const Joi = require('joi');
const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../config/constants');
const userRolesEnum = require('../config/user-roles.enum');

const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).required();

const createValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30)
    .trim()
    .required(),
  password: passwordSchema,
  email: Joi.string().regex(EMAIL_REGEXP).required().trim(),
  role: Joi.string().allow(...Object.values(userRolesEnum))
});

const updateValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30)
    .trim(),
  email: Joi.string().regex(EMAIL_REGEXP).trim(),
});

const passwordValidator = Joi.object({
  password: passwordSchema,
});

module.exports = {
  createValidator,
  updateValidator,
  passwordValidator
};
