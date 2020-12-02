const { WorkExperience, Company } = require('../../models')
const { Op } = require('sequelize')
const responseStandart = require('../../helpers/response')
const schema = require('../../helpers/validation')
const qs = require('querystring')

const workExperienceSchema = schema.WorkExperience

module.exports = {
  postWorkExperience: async (req, res) => {
    try {
      const result = await workExperienceSchema.required().validateAsync(req.body)
      const validationFk = await Company.findByPk(result.companyId)
      if (validationFk !== null) {
        const data = {
          userId: req.user.id,
          companyId: result.companyId,
          position: result.position,
          startAt: result.startAt,
          finishAt: result.finishAt,
          description: result.description
        }
        await WorkExperience.create(data)
        return responseStandart(res, 'success create your Work Experience', {})
      } else {
        return responseStandart(res, 'sorry the company you entered is not registered yet', {}, 400, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  patchWorkExperience: async (req, res) => {
    try {
      const result = await workExperienceSchema.validateAsync(req.body)
      const validationFk = await Company.findByPk(result.companyId)
      if (validationFk !== null) {
        const data = {
          userId: req.user.id,
          companyId: result.companyId,
          position: result.position,
          startAt: result.startAt,
          finishAt: result.finishAt,
          description: result.description
        }
        await WorkExperience.update(data, {
          where: {
            id: req.params.id
          }
        })
        return responseStandart(res, 'success update your Work Experience', {})
      } else {
        return responseStandart(res, 'sorry the company you entered is not registered yet', {}, 400, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  putWorkExperience: async (req, res) => {
    try {
      const result = await workExperienceSchema.required().validateAsync(req.body)
      const validationFk = await Company.findByPk(result.companyId)
      if (validationFk !== null) {
        const data = {
          userId: req.user.id,
          companyId: result.companyId,
          position: result.position,
          startAt: result.startAt,
          finishAt: result.finishAt,
          description: result.description
        }
        await WorkExperience.update(data, {
          where: {
            id: req.params.id
          }
        })
        return responseStandart(res, 'success update your Work Experience', {})
      } else {
        return responseStandart(res, 'sorry the company you entered is not registered yet', {}, 400, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  getWorkExperience: async (req, res) => {
    try {
      const results = await WorkExperience.findByPk(req.params.id, {
        include: [
          {
            model: Company,
            attributes: [
              'id',
              'name',
              'field',
              'city',
              'photo',
              'authorId',
              'createdAt',
              'updatedAt'
            ]
          }
        ]
      })
      if (results !== null) {
        return responseStandart(res, 'success to display Work Experience', {
          results
        })
      } else {
        return responseStandart(
          res,
          'unable to display Work Experience',
          {},
          400,
          false
        )
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  listWorkExperience: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortType = 'DESC' } = req.query
      const offset = (page - 1) * limit
      const { count, rows } = await WorkExperience.findAndCountAll({
        include: [
          {
            model: Company,
            attributes: [
              'id',
              'name',
              'field',
              'city',
              'photo',
              'authorId',
              'createdAt',
              'updatedAt'
            ]
          }
        ],
        where: {
          userId: req.user.id,
          position: {
            [Op.startsWith]: search
          }
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit)
      })

      if (rows.length) {
        return responseStandart(res, 'success to display Work Experience', {
          pageInfo: [
            {
              count: count,
              pages: Math.ceil(count / limit),
              limit: parseInt(limit),
              nextLink:
                page <= Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `worker/experience?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 }
                    })}`
                  : null,
              prevLink:
                page > Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `worker/experience?${qs.stringify({
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
          'unable to display Work Experience',
          {
            pageInfo: [
              {
                count: count,
                pages: Math.ceil(count / limit),
                limit: parseInt(limit),
                nextLink:
                    page <= Math.ceil(count / limit)
                      ? process.env.APP_URL +
                        `worker/experience?${qs.stringify({
                            ...req.query,
                            ...{ page: parseInt(page) + 1 }
                        })}`
                      : null,
                prevLink:
                    page > Math.ceil(count / limit)
                      ? process.env.APP_URL +
                        `worker/experience?${qs.stringify({
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

  deleteWorkExperience: async (req, res) => {
    try {
      const results = await WorkExperience.destroy({
        where: {
          id: req.params.id
        }
      })
      if (results) {
        return responseStandart(res, 'success delete work experience', {})
      } else {
        return responseStandart(res, 'work experience found', {}, 404, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  }
}
