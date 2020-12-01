/* eslint-disable prefer-regex-literals */
const Joi = require('joi')

module.exports = {
  Login: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  }),

  SignupWorker: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.number().integer().min(1000000000).max(99999999999),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  }),

  SignupRecruiter: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.number().integer().min(1000000000).max(99999999999),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    company: Joi.string(),
    jobTitle: Joi.string()
  })
}
