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
    headers: { Authorization: token}
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { 
  getAll,
  setToken,
  create
}