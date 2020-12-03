const router = require('express').Router()
const home = require('../controllers/Home/home')

router.get('/', home.listUser)
router.get('/:id', home.getUserDetails)

module.exports = router
