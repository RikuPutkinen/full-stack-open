import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdotes(state, action) {
      return state.map( anecdote => {
        if (anecdote.id === action.payload.id) {
          return action.payload
        }
        else {
          return anecdote
        }
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    }
  }
})

export function initializeAnecdotes() {
  return async function(dispatch) {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export function createAnecdote(content) {
  return async function(dispatch) {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export function voteAnecdote(anecdote) {
  return async function(dispatch) {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(updateAnecdotes(votedAnecdote))
  }
}

export const { updateAnecdotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer