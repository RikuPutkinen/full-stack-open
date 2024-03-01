const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { log } = require('../utils/logger')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })
  response.json(blogs)
})

blogRouter.post('/',
  middleware.userExtractor,
  async (request, response, next) => {
    const { title, author, url, likes } = request.body
    const user = request.user

    if (!title) {
      return response
        .status(400)
        .json({
          error: 'title missing'
        })
      }
    if (!url) {
      return response
        .status(400)
        .json({
          error: 'url missing'
        })
      }

    const newBlog = {
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
    }
    const blog = new Blog(newBlog)
    
    const result = await blog.save()
    user.blogs = [...user.blogs, result._id]
    await user.save()
    response.status(201).json(result)
  }
)

blogRouter.post('/:id/comments', async (req, res, next) => {
  const { comment } = req.body
  let blog = await Blog.findById(req.params.id)
  blog = blog.toJSON()
  
  const blogToUpdate = {
    ...blog,
    comments: [...blog.comments, comment]
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    blogToUpdate,
    { new: true }
  )
  res.json(updatedBlog)
})

blogRouter.delete('/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog === null) {
      return response
        .status(204)
        .end()
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response
        .status(204)
        .end()
    } else {
      return response
        .status(401)
        .json({
          error: 'invalid permissions'
        })
    }
  }
)

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter