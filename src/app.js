require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const { APP_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})
module.exports = io

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Backend is running well'
  })
})

// REALTIME
io.on('connection', socket => {
  console.log(`App connect: ${socket}`)
})

server.listen(APP_PORT, () => {
  console.log(`app listen on port ${APP_PORT}`)
})

// provide static file
app.use('/assets/uploads/', express.static('./src/assets/uploads'))

const auth = require('./routes/auth')
const worker = require('./routes/worker')
const home = require('./routes/home')
const recuiter = require('./routes/recruiter')

// // attach member router
app.use('/auth', auth)

// Work API
const authValidate = require('./middlewares/auth')
const validation = require('./middlewares/roleValidation')
app.use('/worker', authValidate, validation.worker, worker)
// Recuiter API
app.use('/recruiter', authValidate, validation.recruiter, recuiter)

// Home API
app.use('/home', authValidate, home)
