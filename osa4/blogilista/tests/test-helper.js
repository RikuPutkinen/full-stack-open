const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]


const testUserCredentials = {
  username: 'test',
  name: 'test',
  password: 'test'
}

async function blogsInDb() {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

async function nonExistentId() {
  const newBlog = {
    title: "a",
    author: "b",
    url: "c"
  }

  const blogObject = new Blog(newBlog)
  await blogObject.save()
  await Blog.findByIdAndDelete(blogObject._id)

  return blogObject._id.toString()
}

async function usersInDb() {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

async function getTestToken(api) {
  const res = await api
    .post('/api/login')
    .send({
      username: testUserCredentials.username,
      password: testUserCredentials.password
    })
  
    return res.body.token
}

module.exports = {
  initialBlogs,
  testUserCredentials,
  blogsInDb,
  nonExistentId,
  usersInDb,
  getTestToken
}