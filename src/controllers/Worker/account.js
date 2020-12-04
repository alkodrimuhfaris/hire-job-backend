const { User } = require('../../models')
const responseStandart = require('../../helpers/response')
const schema = require('../../helpers/validation')

const multer = require('multer')
const options = require('../../helpers/uploads')
const upload = options.single('photo')

const accountSchema = schema.Account

module.exports = {
  getAccount: async (req, res) => {
    try {
      const results = await User.findByPk(req.user.id, {
        attributes: [
          'id',
          'name',
          'email',
          'phoneNumber',
          'jobTitle',
          'company',
          'address',
          'instagram',
          'github',
          'linkedin',
          'bio',
          'photo'
        ]
      })
      return responseStandart(res, 'success display user data', {
        results
      })
    } catch (e) {
      return responseStandart(res, e, {}, 500, false)
    }
  },

  patchAccount: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false)
      } else if (err) {
        return responseStandart(res, err, {}, 500, false)
      }
      try {
        const result = await accountSchema.validateAsync(req.body)
        const user = {
          name: result.name,
          email: result.email,
          phoneNumber: result.phoneNumber,
          instagram: result.instagram,
          github: result.github,
          linkedin: result.linkedin,
          jobTitle: result.jobTitle,
          address: result.address,
          company: result.company,
          bio: result.bio,
          photo: req.file === undefined ? undefined : `uploads/${req.file.filename}`
        }
        const filteredObject = Object.keys(user).reduce((results, key) => {
          if (user[key] !== undefined) results[key] = user[key]
          return results
        }, {})
        await User.update(filteredObject, {
          where: {
            id: req.user.id
          }
        })
        return responseStandart(res, 'success update user data', {})
      } catch (e) {
        return responseStandart(res, e, {}, 500, false)
      }
    })
  },

  putAccount: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false)
      } else if (err) {
        return responseStandart(res, err, {}, 500, false)
      }
      try {
        const result = await accountSchema.required().validateAsync(req.body)
        const user = {
          name: result.name,
          email: result.email,
          phoneNumber: result.phoneNumber,
          instagram: result.instagram,
          github: result.github,
          linkedin: result.linkedin,
          jobTitle: result.jobTitle,
          address: result.address,
          company: result.company,
          bio: result.bio,
          photo: req.file === undefined ? undefined : `uploads/${req.file.filename}`
        }
        const filteredObject = Object.keys(user).reduce((results, key) => {
          if (user[key] !== undefined) results[key] = user[key]
          return results
        }, {})
        await User.update(filteredObject, {
          where: {
            id: req.user.id
          }
        })
        return responseStandart(res, 'success update user data', {})
      } catch (e) {
        return responseStandart(res, e, {}, 500, false)
      }
    })
  }
}
