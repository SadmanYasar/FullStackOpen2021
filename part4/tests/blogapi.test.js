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
  await api
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

afterAll(() => {
    mongoose.connection.close()
})