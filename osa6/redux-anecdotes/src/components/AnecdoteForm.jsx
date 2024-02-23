import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import showNotification from "../utils/showNotification"


export default function AnecdoteForm() {
  const dispatch = useDispatch()

  async function addAnecdote(e) {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    showNotification(`Created anecdote ${anecdote}`, dispatch)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input 
            name="anecdote"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

}