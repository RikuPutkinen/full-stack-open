const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { log } = require('../utils/logger')

function getToken(req) {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1]
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  let decodedToken
  try {
    decodedToken = jwt.verify(getToken(request), config.SECRET)
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

  const user = await User.findById(decodedToken.id)

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
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter