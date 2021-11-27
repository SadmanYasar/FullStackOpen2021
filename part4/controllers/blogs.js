const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)

  } catch (error) {
    next(error)
  }
  })
  
blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
  
    try {
      const result = await blog.save()
      response.status(201).json(result)
    } catch (error) {
      next(error) 
    }
  })

module.exports = blogRouter  