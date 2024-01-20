const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test-helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  
  for (const blog of testHelper.initialBlogs){
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Blog API GET', () => {
  test('returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all blogs', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(testHelper.initialBlogs.length)
  })

  test('blogs are identified with an \'id\' field', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
  })
})

describe('Blog API POST', () => {
  test('adds a new blog to the database', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const titles = res.body.map(b => b.title)

    expect(res.body).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('sets likes to 0 if they are not provided', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    expect(res.body[res.body.length - 1].likes).toBe(0)
  })
})

afterAll (async () => {
  await mongoose.connection.close()
})