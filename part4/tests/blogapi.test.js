const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest= require('supertest')
const app = require('../app')
const api = supertest(app)

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

beforeEach( async () => {
    await Blog.deleteMany({})
    
    for (let blog of initialBlogs) {
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

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('invalid blog not posted', async () => {
    await api
      .post('/api/blogs')
      .send({})
      .expect(400)
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
   
  const result = await api.get('/api/blogs')
  expect(result.body).toHaveLength(initialBlogs.length+1)
})

afterAll(() => {
    mongoose.connection.close()
})

