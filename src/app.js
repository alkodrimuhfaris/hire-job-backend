require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const { APP_PORT } = process.env
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})
module.exports = io

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Backend is running well'
  })
})

// provide static file
app.use('/uploads', express.static('assets/uploads'))

const auth = require('./routes/auth')
const worker = require('./routes/worker')
const recruiter = require('./routes/recruiter')
const message = require('./routes/message')

// // attach member router
app.use('/auth', auth)

// Work API
const authValidate = require('./middlewares/auth')
const validation = require('./middlewares/roleValidation')
app.use('/worker', authValidate, validation.worker, worker)
// Recruiter API
app.use('/recruiter', authValidate, validation.recruiter, recruiter)
// Message API
app.use('/message', authValidate, message)

// REALTIME
io.on('connection', socket => {
  console.log(`App connect: ${socket}`)
})

server.listen(APP_PORT, () => {
  console.log(`app listen on port ${APP_PORT}`)
})
