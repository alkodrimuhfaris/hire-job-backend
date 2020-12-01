const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const schema = require('../../helpers/validation')
const responseStandart = require('../../helpers/response')

const signupWorkerSchema = schema.SignupWorker
const signupRecruiterSchema = schema.SignupRecruiter
const loginSchema = schema.Login
const ValidateResetPasswordSchema = schema.ValidateResetPassword
const ResetPasswordSchema = schema.ResetPassword

module.exports = {
  login: async (req, res) => {
    try {
      const result = await loginSchema.required().validateAsync(req.body)
      const validate = await User.findAll({
        where: {
          email: result.email
        }
      })
      if (validate.length) {
        const comparePass = await bcrypt.compareSync(
          result.password,
          validate[0].password
        )
        if (comparePass) {
          jwt.sign(
            { id: validate[0].id, roleId: validate[0].roleId },
            process.env.APP_KEY,
            { expiresIn: '2 days' },
            function (err, token) {
              if (!err) {
                return responseStandart(res, 'Loggin Success', {
                  token: token
                })
              } else {
                return responseStandart(res, err, {}, 403, false)
              }
            }
          )
        } else {
          return responseStandart(res, 'Wrong Password', {}, 400, false)
        }
      } else {
        return responseStandart(res, 'Wrong email', {}, 400, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  signup: async (req, res) => {
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSaltSync(saltRounds)
      let data = {}
      if (parseInt(req.params.id) === 3) {
        const result = await signupRecruiterSchema.required().validateAsync(req.body)
        const hash = await bcrypt.hashSync(result.password, salt)
        data = {
          name: result.name,
          email: result.email,
          phoneNumber: result.phoneNumber,
          password: hash,
          company: result.company,
          jobTitle: result.jobTitle,
          roleId: req.params.id
        }
      } else if (parseInt(req.params.id) === 2) {
        const result = await signupWorkerSchema
          .required()
          .validateAsync(req.body)
        const hash = await bcrypt.hashSync(result.password, salt)
        data = {
          name: result.name,
          email: result.email,
          phoneNumber: result.phoneNumber,
          password: hash,
          roleId: req.params.id
        }
      } else {
        return responseStandart(res, 'role user not valid', {}, 500, false)
      }
      const validate = await User.findAll({
        where: {
          email: data.email
        }
      })
      if (!validate.length) {
        const user = await User.create(data)
        if (user) {
          return responseStandart(res, 'Signup Success', {})
        } else {
          return responseStandart(res, 'Signup failed', {}, 500, false)
        }
      } else {
        return responseStandart(res, 'Email already used', {}, 400, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  validateResetPass: async (req, res) => {
    try {
      const result = await ValidateResetPasswordSchema.validateAsync(req.body)
      const validate = await User.findOne({
        attributes: [
          'id',
          'name',
          'email'
        ],
        where: {
          email: result.email
        }
      })
      if (validate !== null) {
        return responseStandart(res, 'Email Valid', { validate })
      } else {
        return responseStandart(
          res,
          'The user is not registered yet',
          {},
          400,
          false
        )
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  changePass: async (req, res) => {
    try {
      const result = await ResetPasswordSchema.validateAsync(req.body)
      if (result.newPassword === result.confirmPassword) {
        const saltRounds = 10
        const salt = await bcrypt.genSaltSync(saltRounds)
        const hash = await bcrypt.hashSync(result.newPassword, salt)
        const dataUser = {
          password: hash
        }
        await User.update(dataUser, {
          where: {
            id: req.params.id
          }
        })
        return responseStandart(res, 'Change Password Success', {})
      } else {
        return responseStandart(
          res,
          'Passwords are not the same',
          {},
          400,
          false
        )
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  }
}
