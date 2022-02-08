/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  let token;

  beforeEach(async () => {
    const user = {
      username: 'root',
      name: 'root',
      password: '12345',
    };

    await api
      .post('/api/users')
      .send(user);

    const result = await api
      .post('/api/login')
      .send(user);

    token = `Bearer ${result.body.token}`;
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token);

    const blogIds = response.body.map((blog) => blog.id);

    // eslint-disable-next-line no-restricted-syntax
    for (const id of blogIds) {
      expect(id).toBeDefined();
    }
  });
});

describe('addition of a new blog', () => {
  let token;

  beforeEach(async () => {
    const user = {
      username: 'root',
      name: 'root',
      password: '12345',
    };

    await api
      .post('/api/users')
      .send(user);

    const result = await api
      .post('/api/login')
      .send(user);

    token = `Bearer ${result.body.token}`;
  });

  test('fails with status code 401 if token missing', async () => {
    const newBlog = {
      title: 'who let the dogs out',
      author: 'baha men',
      url: 'somewebsite.com',
      likes: 4000,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

  // eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2

  test('fails with status code 400 if empty object', async () => {
    await api
      .post('/api/blogs')
      .send({})
      .set('Authorization', token)
      .expect(400);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'okay this is epic',
        author: 'joeB',
        url: 'somelink.xyz',
        likes: 21,
      })
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('okay this is epic');
  });

  test('if likes property is missing from request, it will default to 0 and succeed', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'this should have 0 likes',
        author: 'joeB',
        url: 'somelink.xyz',
      })
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const blogAdded = blogsAtEnd.find((blog) => blog.title === 'this should have 0 likes');
    expect(blogAdded.likes).toBe(0);
  });

  test('if title and url missing, backend responds with status 400', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'someGuy',
        likes: 40,
      })
      .set('Authorization', token)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  let token;

  beforeEach(async () => {
    const user = {
      username: 'root',
      name: 'root',
      password: '12345',
    };

    await api
      .post('/api/users')
      .send(user);

    const result = await api
      .post('/api/login')
      .send(user);

    token = `Bearer ${result.body.token}`;
  });
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'something new',
      author: 'sy20',
      url: 'www.w3.com',
      likes: 19,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart.find((blog) => blog.title === newBlog.title);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAfterDelete.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  let token;

  beforeEach(async () => {
    const user = {
      username: 'root',
      name: 'root',
      password: '12345',
    };

    await api
      .post('/api/users')
      .send(user);

    const result = await api
      .post('/api/login')
      .send(user);

    token = `Bearer ${result.body.token}`;
  });
  test('succeeds if valid data', async () => {
    const newBlog = {
      title: 'this is a blog to update',
      author: 'jesse',
      url: 'somewebsite.com',
      likes: 30,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token);

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart.find((blog) => blog.title === newBlog.title);

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: 'this is an updated blog',
        author: 'jesse',
        url: 'someOtherwebsite.com',
        likes: 12,
      })
      .set('Authorization', token)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToUpdate.title);
    expect(titles).toContain(updatedBlog.body.title);
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test('succeeds if likes property missing in request body', async () => {
    const newBlog = {
      title: 'this is a blog to update',
      author: 'jesse',
      url: 'somewebsite.com',
      likes: 30,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token);

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart.find((blog) => blog.title === newBlog.title);

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: 'this is an updated blog',
        author: 'jesse',
        url: 'someOtherwebsite.com',
      })
      .set('Authorization', token)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToUpdate.title);
    expect(titles).toContain(updatedBlog.body.title);
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test('fails if required field(s) invalid', async () => {
    const newBlog = {
      title: 'this is a blog to update',
      author: 'jesse',
      url: 'somewebsite.com',
      likes: 30,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token);

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart.find((blog) => blog.title === newBlog.title);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: '',
        author: 's',
        likes: 33,
      })
      .set('Authorization', token)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).toContain(blogToUpdate.title);
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
