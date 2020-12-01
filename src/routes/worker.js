const router = require('express').Router()
const account = require('../controllers/Worker/account')
const workExperience = require('../controllers/Worker/workExperience')
const portofolio = require('../controllers/Worker/portofolio')

router.get('/account', account.getAccount)
router.patch('/account', account.patchAccount)
router.put('/account', account.putAccount)

router.post('/experience', workExperience.postWorkExperience)
router.patch('/experience/:id', workExperience.patchWorkExperience)
router.put('/experience/:id', workExperience.putWorkExperience)
router.get('/experience/:id', workExperience.getWorkExperience)
router.get('/experience', workExperience.listWorkExperience)
router.delete('/experience/:id', workExperience.deleteWorkExperience)

router.post('/portofolio', portofolio.postPortofolio)
router.patch('/portofolio/:id', portofolio.patchPortofolio)
router.put('/portofolio/:id', portofolio.putPortofolio)
router.get('/portofolio/:id', portofolio.getPortofolio)
router.get('/portofolio', portofolio.listPortofolio)
router.delete('/portofolio/:id', portofolio.deletePortofolio)

module.exports = router
