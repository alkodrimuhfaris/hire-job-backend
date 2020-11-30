const route = require('express').Router()
const { login } = require('../../controllers/worker/login')

route.post('/', login)

module.exports = route
