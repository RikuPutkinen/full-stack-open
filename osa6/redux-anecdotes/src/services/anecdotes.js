import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getAll }