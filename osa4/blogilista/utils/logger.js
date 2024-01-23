function log(...params) {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params)
  }
}

function error(...params) {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params)
  }
}

module.exports = {
  log,
  error
}