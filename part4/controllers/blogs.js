const blogRouter = require('express').Router()
const { Mongoose } = require('mongoose')
const { request } = require('../app')
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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})  

module.exports = blogRouter  