import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  const res = await axios.get(baseUrl)
  return res.data
}

async function createAnecdote(content) {
  const object = {content, votes: 0}
  const res = await axios.post(baseUrl, object)
  return res.data
}

async function voteAnecdote(anecdote) {
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, votedAnecdote)
  return res.data
}

export default { getAll, createAnecdote, voteAnecdote }