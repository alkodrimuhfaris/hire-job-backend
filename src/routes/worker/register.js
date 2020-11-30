const route = require('express').Router()
const { register } = require('../../controllers/worker/register')

route.post('/', register)

module.exports = route
