const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (!body.hasOwnProperty('likes')) {
      body.likes = 0
    }

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})  

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  console.log('blog', blog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true, runValidators: true})
  response.json(updatedBlog)
})

module.exports = blogRouter  