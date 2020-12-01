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
  }),

  Account: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.number().integer().min(1000000000).max(99999999999),
    instagram: Joi.string().uri(),
    github: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    jobTitle: Joi.string(),
    address: Joi.string(),
    company: Joi.string(),
    bio: Joi.string()
  }),

  Skill: Joi.object({
    name: Joi.string()
  }),

  WorkExperience: Joi.object({
    position: Joi.string(),
    startAt: Joi.date(),
    finishAt: Joi.date(),
    description: Joi.string()
  }),

  Portofolio: Joi.object({
    name: Joi.string(),
    publicLink: Joi.string().uri(),
    repoLink: Joi.string().uri(),
    company: Joi.string(),
    type: Joi.bool(),
    description: Joi.string()
  })
}
