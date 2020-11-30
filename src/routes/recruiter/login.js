const route = require('express').Router()
const { login } = require('../../controllers/recruiter/login')

route.post('/', login)

module.exports = route
