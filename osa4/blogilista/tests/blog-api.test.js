const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test-helper')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const api = supertest(app)

beforeAll( async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(testHelper.testUserCredentials.password, 10)
  const user = new User({
    username: testHelper.testUserCredentials.username,
    name: testHelper.testUserCredentials.name,
    passwordHash
  })

  await user.save()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const user = await User.findOne({
    username: testHelper.testUserCredentials.username
  })
  
  for (const blog of testHelper.initialBlogs){
    const blogObject = new Blog({
      ...blog,
      user: user._id
    })
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
    const token = await testHelper.getTestToken(api)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await testHelper.blogsInDb()
    const titles = blogs.map(b => b.title)

    expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('sets likes to 0 if they are not provided', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    }
    const token = await testHelper.getTestToken(api)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogs = await testHelper.blogsInDb()
    expect(blogs[blogs.length - 1].likes).toBe(0)
  })

  test('responds with 400 if no title is provided', async () => {
    const noTitle = {
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    }
    const token = await testHelper.getTestToken(api)

    await api
      .post('/api/blogs')
      .send(noTitle)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
  })

  test('responds with 400 if no url is provided', async () => {
    const noUrl = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
    }
    const token = await testHelper.getTestToken(api)

    await api
      .post('/api/blogs')
      .send(noUrl)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
  })

  test('responds with 401 and does not add a new blog if token is not provided', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogs = await testHelper.blogsInDb()
    expect(blogs).toHaveLength(testHelper.initialBlogs.length)

    const titles = blogs.map(b => b.title)
    expect(titles).not.toContain(newBlog.title)
  })
})

describe('Blog API DELETE', () => {
  test('deletes the blog successfully when called with an existing id', async () => {
    const blogs = await testHelper.blogsInDb()
    const firstBlog = blogs[0]
    const token = await testHelper.getTestToken(api)

    await api
    .delete(`/api/blogs/${firstBlog.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204)

    const blogsAfter = await testHelper.blogsInDb()
    expect(blogsAfter).toHaveLength(blogs.length - 1)

    const titles = blogsAfter.map(b => b.title)
    expect(titles).not.toContain(firstBlog.title)
  })

  test('responds with 204 if the id does not exist', async () => {
    const id = await testHelper.nonExistentId()
    const token = await testHelper.getTestToken(api)

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)
  })

  test('responds with 401 if token is not provided', async () => {
    const blogs = await testHelper.blogsInDb()
    const firstBlog = blogs[0]

    await api
    .delete(`/api/blogs/${firstBlog.id}`)
    .expect(401)
    .expect('Content-Type', /application\/json/)
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