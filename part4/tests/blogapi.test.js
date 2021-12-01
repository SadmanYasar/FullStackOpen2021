const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const supertest= require('supertest')
const app = require('../app')
const api = supertest(app)


beforeEach( async () => {
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response =  await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogIds = response.body.map(blog => blog.id)
  
    for (const id of blogIds) {
      expect(id).toBeDefined()
    }
  })
})

describe('addition of a new blog', () => {
  test('fails with status code 400 if empty object', async () => {
    const result = await api
      .post('/api/blogs')
      .send({})
      .expect(400)  
  
    const blogs = await helper.blogsInDb()  
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'okay this is epic',
        author: 'joeB',
        url: 'somelink.xyz',
        likes: 21
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('okay this is epic')
  })

  test('if likes property is missing from request, it will default to 0 and succeed', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'this should have 0 likes',
        author: 'joeB',
        url: 'somelink.xyz',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  
    const blogAdded = blogsAtEnd.find(blog => blog.title === 'this should have 0 likes')
    expect(blogAdded.likes).toBe(0)
  })
  
  test('if title and url missing, backend responds with status 400', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'someGuy',
        likes: 40
      })
      .expect(400)  
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
    
    const titles = blogsAfterDelete.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds if valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
  
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: 'this is an updated blog',
        author: 'jesse',
        url: 'somewebsite.com',
        likes: 30
      })
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(blog => blog.title)
  
    expect(titles).not.toContain(blogToUpdate.title)
    expect(titles).toContain(updatedBlog.body.title)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('succeeds if likes property missing in request body', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
  
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: 'this is an updated blog with no likes',
        author: 'jesse',
        url: 'somewebsite.com',
      })
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(blog => blog.title)
  
    expect(titles).not.toContain(blogToUpdate.title)
    expect(titles).toContain(updatedBlog.body.title)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('fails if required field(s) invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
  
    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: '',
        author:'s',
        likes: 33
      })
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(blog => blog.title)
  
    expect(titles).toContain(blogToUpdate.title)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

afterAll(() => {
    mongoose.connection.close()
})