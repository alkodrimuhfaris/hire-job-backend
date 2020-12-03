const { Skill } = require('../../models')
const { Op } = require('sequelize')
const responseStandart = require('../../helpers/response')
const schema = require('../../helpers/validation')

const skillSchema = schema.Skill

module.exports = {
  postSkill: async (req, res) => {
    try {
      const result = await skillSchema.required().validateAsync(req.body)
      const data = {
        name: result.name
      }
      await Skill.create(data)
      return responseStandart(res, 'success create new skill', {})
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  patchSkill: async (req, res) => {
    try {
      const result = await skillSchema.validateAsync(req.body)
      const data = {
        name: result.name
      }
      await Skill.update(data, {
        where: {
          id: req.params.id
        }
      })
      return responseStandart(res, 'success update skill', {})
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  putSkill: async (req, res) => {
    try {
      const result = await skillSchema.required().validateAsync(req.body)
      const data = {
        name: result.name
      }
      await Skill.update(data, {
        where: {
          id: req.params.id
        }
      })
      return responseStandart(res, 'success update skill', {})
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  getSkill: async (req, res) => {
    try {
      const results = await Skill.findByPk(req.params.id)
      if (results !== null) {
        return responseStandart(res, 'success to display Skill', {
          results
        })
      } else {
        return responseStandart(
          res,
          'unable to display Skill',
          {},
          400,
          false
        )
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  listSkill: async (req, res) => {
    try {
      const { search = '' } = req.query
      const { rows } = await Skill.findAndCountAll({
        where: {
          name: {
            [Op.startsWith]: search
          }
        }
      })
      if (rows.length) {
        return responseStandart(res, 'success to display Skill', {
          results: rows
        })
      } else {
        return responseStandart(res, 'Skill not found', {})
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const results = await Skill.destroy({
        where: {
          id: req.params.id
        }
      })
      if (results) {
        return responseStandart(res, 'success delete Skill', {})
      } else {
        return responseStandart(res, 'Skill not found', {}, 404, false)
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false)
    }
  }

}
