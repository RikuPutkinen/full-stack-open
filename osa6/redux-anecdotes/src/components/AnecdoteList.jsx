import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import showNotification from "../utils/showNotification"

export default function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = ({id, content}) => {
    dispatch(voteAnecdote(id))
    showNotification(`You voted for ${content}`, dispatch)
  }

  const sortedAnecdotes = anecdotes.toSorted((a1, a2) => a2.votes - a1.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
  </div>
  )
}