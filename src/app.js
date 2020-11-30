const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { APP_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

// import routes
const loginWorker = require('./routes/worker/login')
const registerWorker = require('./routes/worker/register')

const loginRecruiter = require('./routes/recruiter/login')
const registerRecruiter = require('./routes/recruiter/register')

app.use('/login/worker', loginWorker)
app.use('/register/worker', registerWorker)

app.use('/login/recruiter', loginRecruiter)
app.use('/register/recruiter', registerRecruiter)

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Backend is running well'
  })
})

app.listen(APP_PORT, () => {
  console.log(`App listen at http://localhost:${APP_PORT}`)
})
