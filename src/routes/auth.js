const router = require('express').Router()
const auth = require('../controllers/Auth/auth')

router.post('/signup/:id', auth.signup)
router.post('/login', auth.login)

module.exports = router
