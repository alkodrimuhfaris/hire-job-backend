const { User } = require('../../models')
const responseStandart = require('../../helpers/response')
const schema = require('../../helpers/validation')

module.exports = {
  getAccount: async (req, res) => {
    try {
      const data = await User.findAll({
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
        ],
        where: {
          id: req.user.id
        }
      })
      const results = data.map((item) => {
        const photo = { URL_photo: process.env.APP_URL + item.photo }
        return Object.assign({}, item.dataValues, photo)
      })
      return responseStandart(res, 'success display user data', {
        results
      })
    } catch (e) {
      return responseStandart(res, e, {}, 500, false)
    }
  }
}
