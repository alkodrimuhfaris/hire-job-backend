const { User } = require('../models')
const { Op } = require('sequelize')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const response = require('../helpers/responseStandard')

module.exports = {
  login: async (req, res) => {
    try {
      let roleId = null
      const { id } = req.params
      const schema = joi.object({
        email: joi.string().lowercase().email().required(),
        password: joi.string().required()
      })
      const { value, error } = schema.validate(req.body)
      const { email, password } = value
      // cek parameter, jika worker maka roleId ganti 1
      if (id === 'worker') {
        roleId = 1
        if (error) {
          return response(res, `Validation: ${error}`, '', false)
        } else {
          const checkEmail = await User.findAll({
            where: {
              [Op.and]: [
                { email },
                { roleId }
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
      // jika params recruiter
      } else if (id === 'recruiter') {
        roleId = 2
        if (error) {
          return response(res, `Validation: ${error}`, '', false)
        } else {
          const checkEmail = await User.findAll({
            where: {
              [Op.and]: [
                { email },
                { roleId }
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
      } else {
        return response(res, 'Route not found', '', false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  register: async (req, res) => {
    try {
      let roleId = null
      const { id } = req.params
      // jika params worker
      if (id === 'worker') {
        const schema = joi.object({
          name: joi.string().required(),
          email: joi.string().lowercase().required(),
          phone: joi.string().required(),
          password: joi.string().required(),
          confirmPassword: joi.string().required()
        })
        roleId = 1
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
                { roleId }
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
        // jika params recruiter
      } else if (id === 'recruiter') {
        const schema = joi.object({
          name: joi.string().required(),
          email: joi.string().lowercase().required(),
          company: joi.string().required(),
          jobTitle: joi.string().required(),
          phone: joi.string().required(),
          password: joi.string().required(),
          confirmPassword: joi.string().required()
        })
        roleId = 2
        // ambil key didalam schema
        const { value, error } = schema.validate(req.body)
        const { name, email, company, jobTitle, phone, password, confirmPassword } = value
        if (error) {
          return response(res, `Validation: ${error}`, '', false)
        } else {
          const checkEmail = await User.findAll({
            where: {
              [Op.and]: [
                { email },
                { roleId }
              ]
            }
          })
          //  console.log(checkEmail)
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
                name, email, company, jobTitle, phoneNumber: phone, password: hash, roleId: 2
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
      } else {
        return response(res, 'Route not found', '', false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  }
}
