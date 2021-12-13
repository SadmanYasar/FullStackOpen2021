const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGO_URI

logger.info(`connecting to ${mongoUrl}`)
mongoose
  .connect(mongoUrl)
  .then(result => {
    logger.info('connected')
  })
  .catch(error => {
    logger.error('could not connect')
  })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

morgan.token('request-body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app