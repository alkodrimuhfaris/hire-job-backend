const router = require('express').Router()
const auth = require('../controllers/Auth/auth')

router.post('/signup/:id', auth.signup)
router.post('/login', auth.login)
router.get('/reset/password', auth.validateResetPass)
router.put('/reset/password/:id', auth.changePass)

module.exports = router
