const Joi = require('joi');
const { PASSWORD_REGEXP } = require('../config/constants');
const { EMAIL_REGEXP } = require('../config/constants');

const createUserAuthValidator = Joi.object({
  email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
  password: Joi.string().trim().regex(PASSWORD_REGEXP).required()
});

module.exports = createUserAuthValidator;
