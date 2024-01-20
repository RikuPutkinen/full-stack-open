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

  test('responds with 400 if no title is provided', async () => {
    const noTitle = {
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    }

    await api
      .post('/api/blogs')
      .send(noTitle)
      .expect(400)
  })

  test('responds with 400 if no url is provided', async () => {
    const noUrl = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
    }

    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)
  })
})

describe('Blog API DELETE', () => {
  test('deletes the blog successfully when called with an existing id', async () => {
    const blogs = await (await api.get('/api/blogs')).body
    const firstBlog = blogs[0]

    await api
    .delete(`/api/blogs/${firstBlog.id}`)
    .expect(204)

    const blogsAfter = await (await api.get('/api/blogs')).body
    expect(blogsAfter).toHaveLength(blogs.length - 1)

    const titles = blogsAfter.map(b => b.title)
    expect(titles).not.toContain(firstBlog.title)
  })

  test('responds with 204 if the id does not exist', async () => {
    const id = await testHelper.nonExistentId()

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  })
})

describe('Blog API PUT', () => {
  test('updates the blog with the correct id', async () => {
    const blogs = testHelper.initialBlogs
    const firstBlog = blogs[0]
    firstBlog.likes = 100

    const res = await api
      .put(`/api/blogs/${firstBlog._id}`)
      .send(firstBlog)
      .expect(200)

    expect(res.body.likes).toBe(firstBlog.likes)
  })
})

afterAll (async () => {
  await mongoose.connection.close()
})