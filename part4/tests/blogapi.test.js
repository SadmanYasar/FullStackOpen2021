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

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two bloglists', async () => {
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

test('empty object not posted', async () => {
  const result = await api
    .post('/api/blogs')
    .send({})
    .expect(400)  

  const blogs = await helper.blogsInDb()  
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('valid blog posted correctly', async () => {
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

test('if likes property is missing from request, it will default to 0', async () => {
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

test('blog can be deleted', async () => {
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

test('blog can be updated', async () => {
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

test('blog updated if likes property missing in request body ', async () => {
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

test('blog not updated if required field(s) missing', async () => {
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

  console.log(result.body.error)  
  
  const blogsAtEnd = await helper.blogsInDb()

  console.log(blogsAtEnd)
  const titles = blogsAtEnd.map(blog => blog.title)

  expect(titles).toContain(blogToUpdate.title)
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})




afterAll(() => {
    mongoose.connection.close()
})