import axios from 'axios'
const baseUrl = '/api/users'

function getAll() {
  return axios.get(baseUrl).then(res => res.data)
}

export default {
  getAll,
}
