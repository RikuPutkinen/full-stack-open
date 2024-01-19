const _ = require('lodash')

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

function mostBlogs(blogs) {
  if (blogs.length === 0) return null
  const counted = _.countBy(blogs, (blog) => blog.author)
  
  const authorList = []
  for (const [key, value] of Object.entries(counted)) {
    authorList.push({author: key, blogs: value})
  }
  
  return authorList.reduce((max, curr) => max.blogs < curr.blogs ? curr : max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}