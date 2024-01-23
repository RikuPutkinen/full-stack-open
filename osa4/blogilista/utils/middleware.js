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
}

module.exports = {
  errorHandler
}