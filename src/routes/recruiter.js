const route = require('express').Router()
const recruiter = require('../controllers/Recruiters/recruiter')
const uploads = require('../helpers/upload')

// account
route.get('/account', recruiter.getRecruiterAccount)
route.patch('/account', uploads, recruiter.updateRecruiterAccount)
// company
route.post('/company', uploads, recruiter.createCompany)
route.get('/company', recruiter.allCompany)
route.get('/company/self', recruiter.myCompany)

module.exports = route
