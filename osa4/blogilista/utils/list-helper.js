function dummy(blogs) {
  return 1
}

function totalLikes(blogs) {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

function favoriteBlog(blogs) {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, curr) => max.likes < curr.likes ? curr : max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}