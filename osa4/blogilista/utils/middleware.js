const { error } = require('./logger')

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
      .status(400)
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

module.exports = {
  errorHandler,
  tokenExtractor
}