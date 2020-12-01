const router = require('express').Router()
const worker = require('../controllers/Worker/account')

router.get('/account', worker.getAccount)

module.exports = router
