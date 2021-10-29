require('dotenv').config()
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')

const mongoUrl = process.env.MONGO_URI

console.log(`connecting to ${mongoUrl}`)
mongoose
  .connect(mongoUrl)
  .then(result => {
    console.log('connected')
  })
  .catch(error => {
    console.log('could not connect')
  })

app.use(cors())
app.use(express.json())

morgan.token('request-body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.use('/api/blogs', blogRouter)







const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})