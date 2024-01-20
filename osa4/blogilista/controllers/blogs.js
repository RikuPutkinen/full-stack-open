const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0
  }
  const blog = new Blog(newBlog)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter