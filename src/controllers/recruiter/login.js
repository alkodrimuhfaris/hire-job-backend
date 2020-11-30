const { User } = require('../../models')
const { Op } = require('sequelize')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const response = require('../../helpers/responseStandard')

module.exports = {
  login: async (req, res) => {
    try {
      const schema = joi.object({
        email: joi.string().lowercase().email().required(),
        password: joi.string().required()
      })
      const { value, error } = schema.validate(req.body)
      const { email, password } = value

      if (error) {
        return response(res, `Validation: ${error}`, '', false)
      } else {
        const checkEmail = await User.findAll({
          where: {
            [Op.and]: [
              { email },
              { roleId: 2 }
            ]
          }
        })
        if (checkEmail.length) {
          const passwordFromDB = checkEmail[0].password
          const comparePassword = bcrypt.compare(password, passwordFromDB)
          if (comparePassword) {
            const { APP_PORT } = process.env
            const jwtToken = {
              id: checkEmail[0].id,
              name: checkEmail[0].name,
              email: checkEmail[0].email,
              phoneNumber: checkEmail[0].phoneNumber,
              company: checkEmail[0].company,
              jobTitle: checkEmail[0].jobTitle,
              address: checkEmail[0].address,
              instagram: checkEmail[0].instagram,
              github: checkEmail[0].github,
              linkedin: checkEmail[0].linkedin,
              photo: checkEmail[0].photo,
              roleId: checkEmail[0].roleId
            }
            const token = jwt.sign({ jwtToken }, APP_PORT)
            const results = checkEmail[0]
            return response(res, 'Login successfully', { results, token }, true)
          } else {
            return response(res, 'Password incorrect')
          }
        } else {
          return response(res, 'Email not found', '', false)
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  }
}
