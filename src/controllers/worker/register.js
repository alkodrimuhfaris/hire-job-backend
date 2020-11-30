const { User } = require('../../models')
const { Op } = require('sequelize')
const joi = require('joi')
const bcrypt = require('bcrypt')
const response = require('../../helpers/responseStandard')

module.exports = {
  register: async (req, res) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().lowercase().required(),
        phone: joi.string().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required()
      })
      // ambil key didalam schema
      const { value, error } = schema.validate(req.body)
      const { name, email, phone, password, confirmPassword } = value
      if (error) {
        return response(res, `Validation: ${error}`, '', false)
      } else {
        const checkEmail = await User.findAll({
          where: {
            [Op.and]: [
              { email },
              { roleId: 1 }
            ]
          }
        })
        // cek apakah email/phone sudah terdaftar
        if (checkEmail.length) {
          return response(res, 'Email already registerd', '', false)
        } else {
          // check phone
          const checkPhone = await User.findAll({
            where: { phoneNumber: phone }
          })
          if (checkPhone.length) {
            return response(res, 'Phone number already registerd', '', false)
          }
          // cek konfirmasi password
          if (password === confirmPassword) {
            // encrypt password
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            // insert data
            const data = {
              name, email, phoneNumber: phone, password: hash, roleId: 1
            }
            const registered = await User.create(data)
            if (registered) {
              return response(res, 'Register successfully', '', true)
            } else {
              return response(res, 'Fail to register', '', false)
            }
          } else {
            return response(res, 'Password not confirm', '', false)
          }
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  }
}
