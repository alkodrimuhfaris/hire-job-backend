const { Portofolio } = require('../../models')
const { Op } = require('sequelize')
const responseStandart = require('../../helpers/response')
const schema = require('../../helpers/validation')
const qs = require('querystring')

const multer = require('multer')
const options = require('../../helpers/upload')
const upload = options.single('photo')

const portofolioSchema = schema.Portofolio

module.exports = {
  postPortofolio: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false)
      } else if (err) {
        return responseStandart(res, err, {}, 500, false)
      }
      try {
        const result = await portofolioSchema.required().validateAsync(req.body)
        const data = {
          userId: req.user.id,
          name: result.name,
          publicLink: result.publicLink,
          repoLink: result.repoLink,
          company: result.company,
          type: result.type,
          description: result.description,
          photo: req.file === undefined ? undefined : req.file.path
        }
        await Portofolio.create(data)
        return responseStandart(res, 'success create your Portofolio', {})
      } catch (e) {
        return responseStandart(res, e, {}, 400, false)
      }
    })
  },

  patchPortofolio: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false)
      } else if (err) {
        return responseStandart(res, err, {}, 500, false)
      }
      try {
        const result = await portofolioSchema.validateAsync(req.body)
        const data = {
          userId: req.user.id,
          name: result.name,
          publicLink: result.publicLink,
          repoLink: result.repoLink,
          company: result.company,
          type: result.type,
          description: result.description,
          photo: req.file === undefined ? undefined : req.file.path
        }
        const filteredObject = Object.keys(data).reduce((results, key) => {
          if (data[key] !== undefined) results[key] = data[key]
          return results
        }, {})
        await Portofolio.update(filteredObject, {
          where: {
            id: req.params.id
          }
        })
        return responseStandart(res, 'success create your Portofolio', {})
      } catch (e) {
        return responseStandart(res, e, {}, 400, false)
      }
    })
  },

  putPortofolio: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false)
      } else if (err) {
        return responseStandart(res, err, {}, 500, false)
      }
      try {
        const result = await portofolioSchema.required().validateAsync(req.body)
        const data = {
          userId: req.user.id,
          name: result.name,
          publicLink: result.publicLink,
          repoLink: result.repoLink,
          company: result.company,
          type: result.type,
          description: result.description,
          photo: req.file === undefined ? undefined : req.file.path
        }
        const filteredObject = Object.keys(data).reduce((results, key) => {
          if (data[key] !== undefined) results[key] = data[key]
          return results
        }, {})
        await Portofolio.update(filteredObject, {
          where: {
            id: req.params.id
          }
        })
        return responseStandart(res, 'success create your Portofolio', {})
      } catch (e) {
        return responseStandart(res, e, {}, 400, false)
      }
    })
  },

  getPortofolio: async (req, res) => {
    try {
      const results = await Portofolio.findByPk(req.params.id)
      if (results !== null) {
        return responseStandart(res, 'success to display Portofolio', {
          results
        })
      } else {
        return responseStandart(
          res,
          'unable to display Portofolio',
          {},
          400,
          false
        )
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  listPortofolio: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortType = 'DESC' } = req.query
      const offset = (page - 1) * limit
      const { count, rows } = await Portofolio.findAndCountAll({
        where: {
          userId: req.user.id,
          name: {
            [Op.startsWith]: search
          }
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit)
      })

      if (rows.length) {
        return responseStandart(res, 'success to display Portofolio', {
          pageInfo: [
            {
              count: count,
              pages: Math.ceil(count / limit),
              limit: parseInt(limit),
              nextLink:
                page <= Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `worker/portofolio?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 }
                    })}`
                  : null,
              prevLink:
                page > Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `worker/portofolio?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) - 1 }
                    })}`
                  : null
            }
          ],
          results: rows
        })
      } else {
        return responseStandart(
          res,
          'unable to display Portofolio',
          {
            pageInfo: [
              {
                count: count,
                pages: Math.ceil(count / limit),
                limit: parseInt(limit),
                nextLink:
                    page <= Math.ceil(count / limit)
                      ? process.env.APP_URL +
                        `worker/portofolio?${qs.stringify({
                            ...req.query,
                            ...{ page: parseInt(page) + 1 }
                        })}`
                      : null,
                prevLink:
                    page > Math.ceil(count / limit)
                      ? process.env.APP_URL +
                        `worker/portofolio?${qs.stringify({
                            ...req.query,
                            ...{ page: parseInt(page) - 1 }
                        })}`
                      : null
              }
            ]
          },
          400,
          false
        )
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  deletePortofolio: async (req, res) => {
    try {
      const results = await Portofolio.destroy({
        where: {
          id: req.params.id
        }
      })
      if (results) {
        return responseStandart(res, 'success delete Portofolio', {})
      } else {
        return responseStandart(res, 'Portofolio not found', {}, 404, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  }
}
