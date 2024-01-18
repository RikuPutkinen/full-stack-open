function dummy(blogs) {
  return 1
}

function totalLikes(blogs) {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}