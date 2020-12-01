const responseStandart = require('../helpers/response')

module.exports = {
  worker: (req, res, next) => {
    if (req.user.roleId === 2) {
      next()
    } else {
      return responseStandart(res, 'Forbidden access', {}, 403, false)
    }
  },
  recruiter: (req, res, next) => {
    if (req.user.roleId === 3) {
      next()
    } else {
      return responseStandart(res, 'Forbidden access', {}, 403, false)
    }
  }
}
