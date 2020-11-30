const route = require('express').Router()
const { register } = require('../../controllers/recruiter/register')

route.post('/', register)

module.exports = route
