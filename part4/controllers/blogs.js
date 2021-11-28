const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    const blogToPost = request.body
    
    if (!blogToPost.hasOwnProperty('likes')) {
      blogToPost.likes = 0
    }

    const blog = new Blog(blogToPost)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })

module.exports = blogRouter  