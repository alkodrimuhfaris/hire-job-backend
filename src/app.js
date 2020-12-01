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

// import route
const recruiter = require('./routes/recruiter')

app.use('/recruiter', recruiter)

app.use('/uploads', express.static('src/assets/uploads'))

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Backend is running well'
  })
})

app.listen(APP_PORT, () => {
  console.log(`app listen on port ${APP_PORT}`)
})

// provide static file
app.use('/assets/uploads/', express.static('assets/uploads'))

const auth = require('./routes/auth')
const worker = require('./routes/worker')
// const recuiter = require('./routes/recuiter')

// // attach member router
app.use('/auth', auth)

// Work API
const authValidate = require('./middlewares/auth')
const validation = require('./middlewares/roleValidation')
app.use('/worker', authValidate, validation.worker, worker)
// Recuiter API
// app.use('/recuiter', authValidate, validation.recuiter, recuiter)
