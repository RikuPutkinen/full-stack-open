const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const loginRouter = require('express').Router()
const config = require('../utils/config')
const { log } = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  log("u:", username)
  log("p:", password)  
  const user = await User.findOne({ username })

  if (user === null) {
    return res
      .status(400)
      .json({
        error: "invalid username"
      })
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    return res
      .status(401)
      .json({
        error: "incorrect password"
      })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name
    })
})

module.exports = loginRouter