const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {

    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  })

blogRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) {
    return response
      .status(404)
      .json({error: 'blog does not exist'})
  }

  if ( blog.user._id.toString() !== user._id.toString()) {
    return response.status(403).json({error: 'cannot delete blog of another user'})
  } 

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})  

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) {
    return response
      .status(404)
      .json({error: 'blog does not exist'})
  }

  if ( blog.user._id.toString() !== user._id.toString()) {
    return response.status(403).json({error: 'cannot update blog of another user'}) 
  } 

  const blogUpdates = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdates, {new:true, runValidators: true})
  response.json(updatedBlog)

})

module.exports = blogRouter  