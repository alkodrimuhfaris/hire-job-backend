const router = require('express').Router()
const account = require('../controllers/Worker/account')
const workExperience = require('../controllers/Worker/workExperience')

router.get('/account', account.getAccount)
router.patch('/account', account.patchAccount)
router.put('/account', account.putAccount)

router.post('/experience', workExperience.postWorkExperience)
router.patch('/experience/:id', workExperience.patchWorkExperience)
router.put('/experience/:id', workExperience.putWorkExperience)
router.get('/experience/:id', workExperience.getWorkExperience)
router.get('/experience', workExperience.listWorkExperience)
router.delete('/experience/:id', workExperience.deleteWorkExperience)

module.exports = router
