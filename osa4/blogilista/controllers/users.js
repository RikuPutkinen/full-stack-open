const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (!password) {
    return res
      .status(400)
      .json({
        error: 'password missing'
      })
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({
        error: 'password must be at least 3 characters long'
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res
      .status(201)
      .json(savedUser)
  } catch(err) {
    next(err)
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1
    })
  res.json(users)
})

module.exports = usersRouter