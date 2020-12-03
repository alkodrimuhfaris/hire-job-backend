const route = require('express').Router()
const messager = require('../controllers/Message/message')

route.post('/chat/:id', messager.sendMessage)
route.get('/chat/:id', messager.getMessage)
route.patch('/chat/:id', messager.updateMessage)
route.patch('/read/:id', messager.updateRead)
route.delete('/chat/:id', messager.deleteMessage)

route.get('/list/person', messager.listPerson)
route.get('/list/chat/:id', messager.listMessage)

module.exports = route
