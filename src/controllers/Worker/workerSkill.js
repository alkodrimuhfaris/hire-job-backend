const { WorkerSkill, Skill } = require('../../models')
const responseStandart = require('../../helpers/response')
const schema = require('../../helpers/validation')
const qs = require('querystring')

const skillSchema = schema.Skill

module.exports = {
  postWorkSkill: async (req, res) => {
    try {
      const result = await skillSchema.required().validateAsync(req.body)
      const [skill, created] = await Skill.findOrCreate({
        where: { name: result.name },
        defaults: {
          name: result.name
        }
      })
      const data = {
        workerId: req.user.id,
        skillId: skill.id
      }
      await WorkerSkill.create(data)
      if (created) {
        return responseStandart(res, 'success create your Worker Skill and new Skill', {})
      } else {
        return responseStandart(res, 'success create your Worker Skill', {})
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  listWorkerSkill: async (req, res) => {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortType = 'DESC' } = req.query
      const offset = (page - 1) * limit
      const { count, rows } = await WorkerSkill.findAndCountAll({
        include: [
          {
            model: Skill,
            attributes: [
              'id',
              'name',
              'createdAt',
              'updatedAt'
            ]
          }
        ],
        where: {
          workerId: req.user.id
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit)
      })

      if (rows.length) {
        return responseStandart(res, 'success to display WorkerSkill', {
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
          'unable to display WorkerSkill',
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
  }
}
