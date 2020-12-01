const route = require('express').Router()
const {
  getRecruiterAccount,
  updateRecruiterAccount,
  createCompany
} = require('../controllers/Recruiters/recruiter')
const uploads = require('../helpers/upload')

// account
route.get('/account/:id', getRecruiterAccount)
route.patch('/account/:id', uploads, updateRecruiterAccount)
// company
route.post('/company/:id', uploads, createCompany)

module.exports = route
