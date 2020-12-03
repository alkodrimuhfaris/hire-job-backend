const route = require('express').Router()
const recruiter = require('../controllers/Recruiters/recruiter')
const uploads = require('../helpers/uploadRama')

// account
route.get('/account', recruiter.getRecruiterAccount)
route.patch('/account', uploads, recruiter.updateRecruiterAccount)
// company
route.post('/company', uploads, recruiter.createCompany)
route.get('/company', recruiter.allCompany)
route.get('/company/self', recruiter.myCompany)
route.get('/company/detail/:id', recruiter.paramsCompany)
route.patch('/company', uploads, recruiter.updateCompany)

module.exports = route
