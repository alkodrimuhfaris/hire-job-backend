const router = require('express').Router()
const account = require('../controllers/Worker/account')

router.get('/account', account.getAccount)
router.patch('/account', account.patchAccount)
router.put('/account', account.putAccount)

module.exports = router
