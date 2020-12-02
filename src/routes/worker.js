const router = require('express').Router()
const account = require('../controllers/Worker/account')
const workExperience = require('../controllers/Worker/workExperience')
const portofolio = require('../controllers/Worker/portofolio')
const skill = require('../controllers/Worker/skill')

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

router.post('/skill', skill.postSkill)
router.patch('/skill/:id', skill.patchSkill)
router.put('/skill/:id', skill.putSkill)
router.get('/skill/:id', skill.getSkill)
router.get('/skill', skill.listSkill)
router.delete('/skill/:id', skill.deleteSkill)

module.exports = router
