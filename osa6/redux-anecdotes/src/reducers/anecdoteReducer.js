import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log(action)
      return [...state, action.payload]
    },
    voteAnecdote(state, action) {
      return state.map( anecdote => {
        if (anecdote.id === action.payload) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
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

export const { createAnecdote, voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer