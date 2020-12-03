const { User, Company } = require('../../models')
const { Op } = require('sequelize')
// const bcrypt = require('bcrypt')
const response = require('../../helpers/response')
const joi = require('joi')
const pagination = require('../../helpers/pagination')

module.exports = {
  // ACCOUNT
  getRecruiterAccount: async (req, res) => {
    try {
      const { id, roleId } = req.user
      const checkAccount = await User.findAll({
        where: {
          [Op.and]: [
            { id },
            { roleId }
          ]
        },
        attributes: {
          exclude: ['password']
        }
      })
      if (checkAccount.length) {
        const results = checkAccount
        return response(res, 'Your account', { results }, 200, true)
      } else {
        return response(res, 'Id not found', '', 404, false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  updateRecruiterAccount: async (req, res) => {
    try {
      const { id, roleId } = req.user
      const checkAccount = await User.findAll({
        where: {
          [Op.and]: [
            { id },
            { roleId }
          ]
        }
      })
      if (checkAccount.length) {
        // jika tidak ada photo
        if (req.file === undefined) {
          const schema = joi.object({
            name: joi.string(),
            email: joi.string(),
            phoneNumber: joi.string(),
            instagram: joi.string(),
            github: joi.string(),
            linkedin: joi.string(),
            jobTilte: joi.string(),
            address: joi.string(),
            company: joi.string(),
            bio: joi.string()
          })
          const { value, error } = schema.validate(req.body)
          //  console.log(value)
          const {
            name, email, phoneNumber, instagram,
            github, linkedin, jobTilte, address,
            company, bio
          } = value
          if (error) {
            return response(res, `Validation: ${error}`, '', 400, false)
          } else {
            const myEmail = checkAccount[0].email
            const myPhone = checkAccount[0].phoneNumber
            // check email
            const checkAnotherEmail = await User.findAll({
              where: {
                email: {
                  [Op.ne]: myEmail
                }
              }
            })
            // check email
            const mapEmail = await checkAnotherEmail.map(o => {
              return o.email
            })
            // console.log('nameeee', name)
            const checkSameEmail = await mapEmail.some(item => item === email)
            if (checkSameEmail) {
              return response(res, 'Email already registerd', '', 400, false)
            } else {
              // cek phone
              const checkAnotherPhone = await User.findAll({
                where: {
                  phoneNumber: {
                    [Op.ne]: myPhone
                  }
                }
              })
              // check phone
              const mapPhone = await checkAnotherPhone.map(o => {
                return o.phoneNumber
              })
              const checkSamePhone = await mapPhone.some(item => item === phoneNumber)
              if (checkSamePhone) {
                return response(res, 'Phone number already registerd', '', 400, false)
              } else {
                const data = {
                  name,
                  email,
                  phoneNumber,
                  instagram,
                  github,
                  linkedin,
                  jobTilte,
                  address,
                  company,
                  bio
                }
                //  console.log(data)
                const user = await User.findByPk(id)
                const results = await user.update(data)
                if (results) {
                  return response(res, 'Edit has been updated', { results }, 200, true)
                } else {
                  return response(res, 'Fail to update', '', 400, false)
                }
              }
            }
          }
          // jika ada photo
        } else {
          //  console.log(req.file)
          const photo = `uploads/${req.file.filename}`
          const schema = joi.object({
            name: joi.string(),
            email: joi.string(),
            phoneNumber: joi.string(),
            instagram: joi.string(),
            github: joi.string(),
            linkedin: joi.string(),
            jobTilte: joi.string(),
            address: joi.string(),
            company: joi.string(),
            bio: joi.string()
          })
          const { value, error } = schema.validate(req.body)
          //  console.log(value)
          const {
            name, email, phoneNumber, instagram,
            github, linkedin, jobTilte, address,
            company, bio
          } = value
          if (error) {
            return response(res, `Validation: ${error}`, '', 400, false)
          } else {
            const myEmail = checkAccount[0].email
            const myPhone = checkAccount[0].phoneNumber
            // check email
            const checkAnotherEmail = await User.findAll({
              where: {
                email: {
                  [Op.ne]: myEmail
                }
              }
            })
            // check email
            const mapEmail = await checkAnotherEmail.map(o => {
              return o.email
            })
            // console.log('nameeee', name)
            const checkSameEmail = await mapEmail.some(item => item === email)
            if (checkSameEmail) {
              return response(res, 'Email already registerd', '', 400, false)
            } else {
              // cek phone
              const checkAnotherPhone = await User.findAll({
                where: {
                  phoneNumber: {
                    [Op.ne]: myPhone
                  }
                }
              })
              // check phone
              const mapPhone = await checkAnotherPhone.map(o => {
                return o.phoneNumber
              })
              const checkSamePhone = await mapPhone.some(item => item === phoneNumber)
              if (checkSamePhone) {
                return response(res, 'Phone number already registerd', '', 400, false)
              } else {
                const data = {
                  name,
                  email,
                  phoneNumber,
                  instagram,
                  github,
                  linkedin,
                  jobTilte,
                  address,
                  company,
                  bio,
                  photo
                }
                //  console.log(data)
                const user = await User.findByPk(id)
                const results = await user.update(data)
                if (results) {
                  return response(res, 'Edit has been updated', { results }, 200, true)
                } else {
                  return response(res, 'Fail to update', '', 400, false)
                }
              }
            }
          }
        }
      } else {
        return response(res, 'You are not recruiter', '', 400, false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  // COMPANY
  createCompany: async (req, res) => {
    try {
      const { id, roleId } = req.user
      const schema = joi.object({
        name: joi.string(),
        field: joi.string(),
        city: joi.string()
      })
      const { value, error } = schema.validate(req.body)
      const { name, field, city } = value
      if (error) {
        return response(res, `Validation: ${error}`, '', 400, false)
      } else {
        // console.log(req.user.id)
        const checkAccount = await User.findAll({
          where: {
            [Op.and]: [
              { id },
              { roleId }
            ]
          }
        })
        if (checkAccount.length) {
          const checkAuthor = await Company.findAll({
            where: { authorId: id }
          })
          console.log(checkAuthor.length)
          if (checkAuthor.length) {
            return response(res, 'You already have a company', '', 400, false)
          } else {
            if (req.file === undefined) {
              const data = {
                name, field, city, authorId: id
              }
              const results = await Company.create(data)
              if (results) {
                return response(res, 'Company has benn added', '', 200, true)
              } else {
                return response(res, 'Fail to add company', '', 400, false)
              }
            } else {
              const photo = `uploads/${req.file.filename}`
              const data = {
                name, field, city, authorId: id, photo
              }
              const results = await Company.create(data)
              if (results) {
                return response(res, 'Company has benn added', '', 200, true)
              } else {
                return response(res, 'Fail to add company', '', 400, false)
              }
            }
          }
        } else {
          return response(res, 'Account not found', '', 400, false)
        }
        // return response(res, '', { checkAccount }, 200, true)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  allCompany: async (req, res) => {
    try {
      const { search, sortBy = 'createdAt', sortType = 'DESC' } = req.query
      // searching berdasaran nama compay
      let results = []
      let count = 0
      const path = 'recruiter/company'
      const { limit, page, offset } = pagination.pagePrep(req.query)
      if (search) {
        ({ count, rows: results } = await Company.findAndCountAll({
          limit,
          offset,
          where: {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          order: [
            [sortBy, sortType]
          ]
        }))
        const pageInfo = pagination.paging(path, req, count, page, limit)
        if (results.length) {
          return response(res, 'Your searching', { results, pageInfo }, 200, true)
        } else {
          return response(res, 'Not found', { pageInfo }, 400, false)
        }
      } else {
        ({ count, rows: results } = await Company.findAndCountAll({
          limit,
          offset,
          order: [
            [sortBy, sortType]
          ]
        }))
        const pageInfo = pagination.paging(path, req, count, page, limit)
        if (results.length) {
          return response(res, 'All company', { results, pageInfo }, 200, true)
        } else {
          return response(res, 'Company not available', 400, false)
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  myCompany: async (req, res) => {
    try {
      const { id } = req.user
      const results = await Company.findAll({
        where: {
          authorId: id
        }
      })
      if (results.length) {
        return response(res, 'Your company', { results }, 200, true)
      } else {
        return response(res, 'Dont have company', '', 400, false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  paramsCompany: async (req, res) => {
    try {
      const { id } = req.params
      const results = await Company.findAll({
        where: {
          id
        }
      })
      if (results.length) {
        return response(res, 'Your company', { results }, 200, true)
      } else {
        return response(res, 'Company not found', '', 400, false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  updateCompany: async (req, res) => {
    try {
      const { id } = req.user
      const checkCompanyUser = await Company.findAll({
        where: {
          authorId: id
        }
      })
      if (checkCompanyUser.length) {
        const schema = joi.object({
          name: joi.string(),
          field: joi.string(),
          city: joi.string()
        })
        const { value, error } = schema.validate(req.body)
        const { name, field, city } = value
        if (error) {
          return response(res, `Valdidation: ${error}`, '', 400, false)
        } else {
          if (req.file === undefined) {
            const data = {
              name, field, city
            }
            const results = await Company.update(data, {
              where: {
                authorId: id
              }
            })
            if (results) {
              return response(res, 'Company has been updated', { results }, 200, true)
            } else {
              return response(res, 'Fail to update', '', 400, false)
            }
          } else {
            const photo = `uploads/${req.file.filename}`
            const data = {
              name, field, city, photo
            }
            const results = await Company.update(data, {
              where: {
                authorId: id
              }
            })
            if (results) {
              return response(res, 'Company has been updated', '', 200, true)
            } else {
              return response(res, 'Fail to update', '', 400, false)
            }
          }
        }
      } else {
        return response(res, 'You dont have company yet', '', 400, false)
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  }
}
