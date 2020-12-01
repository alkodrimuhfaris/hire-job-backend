const responseStandart = require('../helpers/response')

module.exports = {
  worker: (req, res, next) => {
    if (req.user.rolesId === 2) {
      next()
    } else {
      return responseStandart(res, 'Forbidden access', {}, 403, false)
    }
  },
  recruiter: (req, res, next) => {
    if (req.user.rolesId === 3) {
      next()
    } else {
      return responseStandart(res, 'Forbidden access', {}, 403, false)
    }
  }
}
