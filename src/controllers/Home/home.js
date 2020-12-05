const { User, WorkExperience, WorkerSkill, Skill, Portofolio, Company } = require('../../models')
const { Op } = require('sequelize')
const responseStandart = require('../../helpers/response')
const qs = require('qs')
const sequelize = require('sequelize')

module.exports = {
  listUser: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = { name: '' }, sortBy = 'createdAt', sortType = 'DESC' } = req.query
      const searchArr = Object.entries(search)
      const [[searchKey, searchVal]] = searchArr
      const offset = (page - 1) * limit
      if (req.user.roleId === 3) {
        console.log('masuk role id 3')
        const { count, rows } = await User.findAndCountAll({
          attributes: [
            'id',
            'name',
            'jobTitle',
            'address',
            'photo',
            'createdAt',
            'updatedAt'
          ],
          include: [
            {
              model: WorkerSkill,
              attributes: ['id', 'workerId'],
              include: [Skill]
            }
          ],
          distinct: true,
          where: {
            roleId: 2,
            [searchKey]: {
              [Op.like]: `%${searchVal}%`
            }
          },
          order: [
            sortBy === 'name'
              ? sequelize.fn('isnull', sequelize.col('User.name'))
              : sortBy === 'skill'
                ? [WorkerSkill, Skill, 'createdAt', 'DESC']
                : sequelize.fn('isnull', sequelize.col(sortBy)),
            sortBy === 'skill' ? [WorkerSkill, Skill, 'name', sortType] : [sortBy, sortType]
          ],
          offset: parseInt(offset) || 0,
          limit: parseInt(limit)
        })

        const result = async () => {
          return Promise.all(
            rows.map(async (item) => {
              const amount = await WorkerSkill.count({
                where: {
                  workerId: item.id
                }
              })
              return Object.assign({}, item.dataValues, {
                SkillAmount: amount || 0
              })
            })
          )
        }
        result().then(results => {
          if (results.length) {
            return responseStandart(res, 'success to display Worker', {
              pageInfo: [
                {
                  count: count,
                  pages: Math.ceil(count / limit),
                  limit: parseInt(limit),
                  nextLink:
                  page < Math.ceil(count / limit)
                    ? process.env.APP_URL +
                    `home/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) + 1 }
                    })}`
                    : null,
                  prevLink:
                  page > 0 && page <= Math.ceil(count / limit)
                    ? process.env.APP_URL +
                    `home/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) - 1 }
                    })}`
                    : null
                }
              ],
              results
            })
          } else {
            return responseStandart(
              res,
              'unable to display Worker',
              {
                pageInfo: [
                  {
                    count: count,
                    pages: Math.ceil(count / limit),
                    limit: parseInt(limit),
                    nextLink:
                    page < Math.ceil(count / limit)
                      ? process.env.APP_URL +
                      `home/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 }
                      })}`
                      : null,
                    prevLink:
                    page > 0 && page <= Math.ceil(count / limit)
                      ? process.env.APP_URL +
                      `home/?${qs.stringify({
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
        })
      } else if (req.user.roleId === 2) {
        const { count, rows } = await User.findAndCountAll({
          attributes: [
            'id',
            'name',
            'jobTitle',
            'address',
            'company',
            'photo',
            'createdAt',
            'updatedAt'
          ],
          include: [{
            model: Company
          }],
          distinct: true,
          where: {
            roleId: 3,
            [searchKey]: {
              [Op.like]: `%${searchVal}%`
            }
          },
          order: [
            sequelize.fn('isnull', sequelize.col(sortBy)),
            sortBy !== 'field' ? [sortBy, sortType] : [Company, sortBy, sortType],
            ['company', 'ASC']
          ],
          offset: parseInt(offset) || 0,
          limit: parseInt(limit)
        })

        if (rows.length) {
          return responseStandart(res, 'success to display Recruiter', {
            pageInfo: [
              {
                count: count,
                pages: Math.ceil(count / limit),
                limit: parseInt(limit),
                nextLink:
                    page < Math.ceil(count / limit)
                      ? process.env.APP_URL +
                      `home/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 }
                      })}`
                      : null,
                prevLink:
                    page > 0 && page <= Math.ceil(count / limit)
                      ? process.env.APP_URL +
                      `home/?${qs.stringify({
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
            'unable to display Recruiter',
            {
              pageInfo: [
                {
                  count: count,
                  pages: Math.ceil(count / limit),
                  limit: parseInt(limit),
                  nextLink:
                      page < Math.ceil(count / limit)
                        ? process.env.APP_URL +
                        `home/?${qs.stringify({
                          ...req.query,
                          ...{ page: parseInt(page) + 1 }
                        })}`
                        : null,
                  prevLink:
                      page > 0 && page <= Math.ceil(count / limit)
                        ? process.env.APP_URL +
                        `home/?${qs.stringify({
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
      }
    } catch (e) {
      console.log(e)
      return responseStandart(res, e.message, {}, 400, false)
    }
  },

  getUserDetails: async (req, res) => {
    try {
      const results = await User.findByPk(req.params.id, {
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
        include: [
          { model: WorkerSkill, attributes: ['id', 'workerId'], include: [Skill] },
          { model: WorkExperience, include: [Company] },
          Portofolio
        ]
      })
      if (results !== null) {
        return responseStandart(res, 'success to display user details', {
          results
        })
      } else {
        return responseStandart(
          res,
          'unable to display user details',
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
