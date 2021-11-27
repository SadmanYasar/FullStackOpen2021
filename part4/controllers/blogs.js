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
    const blogToPost = request.body

    if (!blogToPost.hasOwnProperty('likes')) {
      blogToPost.likes = 0
    }

    const blog = new Blog(blogToPost)

    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch (error) {
      next(error) 
    }
  })

module.exports = blogRouter  