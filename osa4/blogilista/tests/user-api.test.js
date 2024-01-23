const bcrypt = require('bcryptjs')
const User = require('../models/user')
const app = require('../app')
const testHelper = require('./test-helper')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('admin', 10)
  const user = new User({
    username: 'admin',
    name: 'admin',
    passwordHash
  })

  await user.save()
})

describe('User API POST', () => {
  test('succeeds with a new username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: "ABC",
      name: "A",
      password: "password"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with a missing username', async () => {
    const noUsername = {
      name: "A",
      password: "password"
    }

    const res = await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)

    expect(res.body.error).toBe("User validation failed: username: Path `username` is required.")
  })

  test('fails with a missing password', async () => {
    const noPassword = {
      username: "ABC",
      name: "A",
    }

    const res = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)

    expect(res.body.error).toBe("password missing")
  })

  test('fails when username is too short', async () => {
    const shortUsername = {
      username: "AB",
      name: "A",
      password: "password"
    }

    const res = await api
      .post('/api/users')
      .send(shortUsername)
      .expect(400)

    expect(res.body.error).toBe("User validation failed: username: Path `username` (`AB`) is shorter than the minimum allowed length (3).")
  })

  test('fails when password is too short', async () => {
    const shortPassword = {
      username: "ABC",
      name: "A",
      password: "pa"
    }

    const res = await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)

    expect(res.body.error).toBe("password must be at least 3 characters long")
  })

  test('fails when username already exists in the database', async () => {
    const existingUsername = {
      username: "admin",
      name: "A",
      password: "password"
    }

    const res = await api
      .post('/api/users')
      .send(existingUsername)
      .expect(400)

    expect(res.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `admin`")
  })

  test('does not add invalid user to the database', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const existingUsername = {
      username: "admin",
      name: "A",
      password: "password"
    }

    await api
      .post('/api/users')
      .send(existingUsername)
      .expect(400)

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('User API GET', () => {
  test('returns the right amount of users as JSON', async () => {
    const usersInDb = await testHelper.usersInDb()

    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(usersInDb.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})