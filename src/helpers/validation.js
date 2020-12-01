/* eslint-disable prefer-regex-literals */
const Joi = require('joi')

module.exports = {
  Login: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })
}
