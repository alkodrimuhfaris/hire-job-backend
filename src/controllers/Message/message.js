const { Message, User } = require('../../models')
const { Op } = require('sequelize')
const joi = require('joi')
const io = require('../../app')
const response = require('../../helpers/response')
const pagination = require('../../helpers/pagination')

module.exports = {
  sendMessage: async (req, res) => {
    try {
      const sender = req.user.id
      const recipient = req.params.id
      const schema = joi.object({
        message: joi.string()
      })
      const { value, error } = schema.validate(req.body)
      const { message } = value
      if (error) {
        return response(res, `Validation: ${error}`, '', 400, false)
      } else {
        if (sender === recipient) {
          return response(res, 'You cant send message to your self, use your brain', '', 400, false)
        } else {
          // mengupdate isLates sebelum kirim pesan
          const updateIsLasts = await Message.update({ isLates: 0 }, {
            where: {
              [Op.or]: [
                {
                  [Op.and]: [
                    { sender },
                    { recipient }
                  ]
                },
                {
                  [Op.and]: [
                    { sender: recipient },
                    { recipient: sender }
                  ]
                }
              ]
            }
          })
          if (updateIsLasts.length) {
            const data = {
              sender, recipient, message, isLates: 1, unread: true
            }
            const results = await Message.create(data)
            const senderData = await User.findByPk(sender, {
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'bio',
                  'roleId'
                ]
              }
            })
            const sendEvent = 'send ' + recipient
            io.emit(sendEvent, { sender, message: results, senderData })
            if (results) {
              return response(res, 'Message has been sent', { results }, 200, true)
            } else {
              return response(res, 'Fail to sent message', '', 400, false)
            }
          } else {
            return response(res, 'Fail to update isLates', '', 400, false)
          }
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  getMessage: async (req, res) => {
    const { id } = req.params
    const myAccount = req.user.id
    const selectMyChat = await Message.findAll({
      where: {
        [Op.and]: [
          {
            id
          },
          {
            [Op.or]: [
              { sender: myAccount },
              { recipient: myAccount }
            ]
          }
        ]
      },
      include: [
        {
          model: User,
          as: 'SenderDetails',
          attributes: {
            exclude: [
              'password',
              'instagram',
              'github',
              'linkedin',
              'address',
              'company',
              'bio',
              'roleId'
            ]
          }
        },
        {
          model: User,
          as: 'RecipientDetails',
          attributes: {
            exclude: [
              'password',
              'instagram',
              'github',
              'linkedin',
              'address',
              'company',
              'bio',
              'roleId'
            ]
          }
        }
      ]
    })
    if (selectMyChat.length) {
      const results = selectMyChat[0]
      return response(res, `Message by id ${id}`, { results }, 200, true)
    } else {
      return response(res, 'Message not found', '', 400, false)
    }
  },

  listPerson: async (req, res) => {
    try {
      const myAccount = req.user.id
      const { search, sortBy = 'createdAt', sortType = 'DESC' } = req.query
      // searching berdasaran nama compay
      let results = []
      let count = 0
      const path = 'message/list/person'
      const { limit, page, offset } = pagination.pagePrep(req.query)
      // console.log(req.query)
      // jika query search ada
      // searching berdasarkan pesan
      if (search) {
        ({ count, rows: results } = await Message.findAndCountAll({
          limit,
          offset,
          where: {
            [Op.and]: [
              {
                message: {
                  [Op.like]: `%${search}%`
                }
              },
              {
                [Op.or]: [
                  { sender: myAccount },
                  { recipient: myAccount }
                ]
              }
            ]
          },
          order: [
            [sortBy, sortType]
          ],
          include: [
            {
              model: User,
              as: 'SenderDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'bio',
                  'roleId'
                ]
              }
            },
            {
              model: User,
              as: 'RecipientDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'bio',
                  'roleId'
                ]
              }
            }
          ]
        }))
        const pageInfo = pagination.paging(path, req, count, page, limit)
        return response(res, 'Your searching', { results, pageInfo }, 200, true)
      } else {
        ({ count, rows: results } = await Message.findAndCountAll({
          limit,
          offset,
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  {
                    isLates: 1
                  },
                  {
                    sender: myAccount
                  }
                ]
              },
              {
                [Op.and]: [
                  {
                    isLates: 1
                  },
                  {
                    recipient: myAccount
                  }
                ]
              }
            ]
          },
          order: [
            [sortBy, sortType]
          ],
          include: [
            {
              model: User,
              as: 'SenderDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'bio',
                  'roleId'
                ]
              }
            },
            {
              model: User,
              as: 'RecipientDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'bio',
                  'roleId'
                ]
              }
            }
          ]
        }))
        const pageInfo = pagination.paging(path, req, count, page, limit)
        if (results.length) {
          return response(res, 'Your list chat', { results, pageInfo }, 200, true)
        } else {
          return response(res, 'You dont have chat yet', { results, pageInfo }, 200, true)
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  listMessage: async (req, res) => {
    try {
      const { id } = req.params
      const myAccount = req.user.id
      const { search, sortBy = 'createdAt', sortType = 'DESC' } = req.query
      // searching berdasaran nama compay
      let results = []
      let count = 0
      const path = `message/list/chat/${id}`
      const { limit, page, offset } = pagination.pagePrep(req.query)
      // jika search
      // searching berdasarkan pesan
      if (search) {
        ({ count, rows: results } = await Message.findAndCountAll({
          limit,
          offset,
          where: {
            [Op.and]: [
              {
                message: {
                  [Op.like]: `%${search}%`
                }
              },
              {
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        sender: myAccount
                      },
                      {
                        recipient: id
                      }
                    ]
                  },
                  {
                    [Op.and]: [
                      {
                        sender: id
                      },
                      {
                        recipient: myAccount
                      }
                    ]
                  }
                ]
              }
            ]
          },
          include: [
            {
              model: User,
              as: 'SenderDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'company',
                  'bio',
                  'roleId'
                ]
              }
            },
            {
              model: User,
              as: 'RecipientDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'company',
                  'bio',
                  'roleId'
                ]
              }
            }
          ],
          order: [
            [sortBy, sortType]
          ]
        }))
        const pageInfo = pagination.paging(path, req, count, page, limit)
        if (results.length) {
          return response(res, `Your search chat with id ${id}`, { results, pageInfo }, 200, true)
        } else {
          return response(res, 'Search not found', { results, pageInfo }, 200, true)
        }
      } else {
        ({ count, rows: results } = await Message.findAndCountAll({
          limit,
          offset,
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  {
                    sender: myAccount
                  },
                  {
                    recipient: id
                  }
                ]
              },
              {
                [Op.and]: [
                  {
                    sender: id
                  },
                  {
                    recipient: myAccount
                  }
                ]
              }
            ]
          },
          include: [
            {
              model: User,
              as: 'SenderDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'company',
                  'bio',
                  'roleId'
                ]
              }
            },
            {
              model: User,
              as: 'RecipientDetails',
              attributes: {
                exclude: [
                  'password',
                  'instagram',
                  'github',
                  'linkedin',
                  'address',
                  'company',
                  'bio',
                  'roleId'
                ]
              }
            }
          ],
          order: [
            [sortBy, sortType]
          ]
        }))
        const pageInfo = pagination.paging(path, req, count, page, limit)
        if (results.length) {
          return response(res, `Your chat with id ${id}`, { results, pageInfo }, 200, true)
        } else {
          return response(res, `You never chat with id ${id}`, { results, pageInfo }, 200, true)
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  updateMessage: async (req, res) => {
    try {
      const myAccount = req.user.id
      const { id } = req.params
      const schema = joi.object({
        message: joi.string()
      })
      const { value, error } = schema.validate(req.body)
      const { message } = value
      if (error) {
        return response(res, `Validation: ${error}`, '', 400, false)
      } else {
        // check pesan
        const selectMessage = await Message.findAll({
          where: {
            [Op.and]: [
              { id },
              { sender: myAccount }
            ]
          }
        })
        // jika ada maka update
        if (selectMessage.length) {
          const data = {
            message
          }
          const updated = await Message.update(data, {
            where: {
              [Op.and]: [
                { id },
                { sender: myAccount }
              ]
            }
          })
          // jika sudah terupdate maka ambil pesan untuk ditampilkan
          if (updated) {
            const getMessageUpdated = await Message.findAll({
              where: {
                [Op.and]: [
                  { id },
                  { sender: myAccount }
                ]
              }
            })
            // const results = getMessageUpdated[0]
            return response(res, 'Success edit message', { message }, 200, true)
          } else {
            return response(res, 'Fail to edit message', '', 400, false)
          }
        } else {
          return response(res, 'Message not found', '', 400, false)
        }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', 400, false)
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params
      const myAccount = req.user.id
      // hapus pesan berdasarkan id, dimana sender=id dari jwt/recipient=id dari jwt
      const deleted = await Message.destroy({
        where: {
          [Op.and]: [
            {
              id
            },
            {
              [Op.or]: [
                {
                  sender: myAccount
                },
                {
                  recipient: myAccount
                }
              ]
            }
          ]
        }
      })
      if (deleted) {
        return response(res, `Message id ${id} has been deleted`, '', 200, true)
      } else {
        return response(res, 'Fail to deleted', '', 400, false)
      }
    } catch (err) {
      return response(res, 'Catch: err', '', 400, false)
    }
  },
  updateRead: async (req, res) => {
    const { id: recipient } = req.user
    const { id: sender } = req.params
    try {
      const unreadChat = await Message.findAll({
        where: {
          sender,
          recipient,
          unread: true
        }
      })
      if (!unreadChat.length) {
        return response(res, 'all chat has been read')
      }
      await Message.update(
        { unread: false },
        {
          where: {
            sender,
            recipient,
            unread: true
          }
        }
      )
      const readEvent = 'read ' + sender
      io.emit(readEvent, { recipient, read: true })
      return response(res, 'all recent chat has been updated to read')
    } catch (err) {
      console.log(err)
      return response(res, err.message, { err }, 500, false)
    }
  }
}
