require('dotenv').config()
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id
    delete returnedDocument.__v
    delete returnedDocument._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

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



app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})