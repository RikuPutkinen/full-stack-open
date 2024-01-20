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

afterAll (async () => {
  await mongoose.connection.close()
})