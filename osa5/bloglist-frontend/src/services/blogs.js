import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

async function create(newBlog) {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

async function like(blog) {
  const { user, likes, author, title, url } = blog

  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(
    `${baseUrl}/${blog.id}`,
    {
      user: user._id,
      likes: likes + 1,
      author,
      title,
      url,
    },
    config
  )
  return res.data
}

async function deleteBlog(blog) {
  const { id } = blog
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res
}

export default {
  getAll,
  setToken,
  create,
  like,
  deleteBlog,
}
