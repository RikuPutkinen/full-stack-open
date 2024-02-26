import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export function getAnecdotes() {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

export function createAnecdote(newAnecdote) {
  return axios
    .post(baseUrl, newAnecdote)
    .then(res => res.data)
}

export function updateAnecdote(updatedAnecdote) {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(res => res.data)
}