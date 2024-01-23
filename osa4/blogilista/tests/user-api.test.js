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