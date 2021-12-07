const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'hello world',
      author: 'sy17',
      url: 'www.someurl.org',
      likes: 20
    } ,
    {
      title: 'hello again',
      author: 'solid snake',
      url: 'www.anotherURL.org',
      likes: 100
    }
  ]

const nonExistingId = async () => {
    const note = new Blog({
        title: 'will be deleted',
        author: 'sadvc',
        url: 'www.sasdfe.org',
        likes: 30
    })
    await note.save()
    await note.remove()
  
    return note._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
module.exports = {
    initialBlogs, 
    nonExistingId, 
    blogsInDb,
    usersInDb
  }