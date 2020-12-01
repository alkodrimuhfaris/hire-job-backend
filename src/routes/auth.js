const route = require('express').Router()
const {
  login, register
} = require('../controllers/auth')

route.post('/login/:id', login)
route.post('/signup/:id', register)

module.exports = route
