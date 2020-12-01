/* eslint-disable prefer-regex-literals */
const Joi = require('joi')

module.exports = {
  Login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  }),

  SignupWorker: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(99999999999)
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  }),

  SignupRecruiter: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(99999999999)
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    company: Joi.string().required(),
    jobTitle: Joi.string().required()
  })
}
