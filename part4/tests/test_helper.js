const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'hello world',
      author: 'sy17',
      url: 'www.someurl.org',
      likes: 69
    } ,
    {
      title: 'hello again',
      author: 'sy17',
      url: 'www.someurl.org',
      likes: 420
    }
  ]

const nonExistingId = async () => {
    const note = new Blog({
        title: 'will be deleted',
        author: 'sadvc',
        url: 'www.sasdfe.org',
        likes: 69
    })
    await note.save()
    await note.remove()
  
    return note._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }