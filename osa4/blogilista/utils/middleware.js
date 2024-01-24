const { error, log } = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

function errorHandler(err, req, res, next) {
  error(err.message)

  if (err.name === 'ValidationError') {
    return res
      .status(400)
      .json({
        error: err.message
      })
  }
  else if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .json({
        error: 'missing or invalid token'
      })
  }
}

function tokenExtractor(req, res, next) {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.split(' ')[1]
  } else {
    req.token = null
  }
  next()
}

async function userExtractor(req, res, next) {
  let decodedToken
  try {
    decodedToken = jwt.verify(req.token, config.SECRET)
  }
  catch(err){
    next(err)
    return
  }

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({
        error: 'invalid token'
      })
  }
  req.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}