import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote)
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: "SET",
      payload: `voted anecdote '${anecdote.content}'`
    })
  }

  if (result.isLoading) {
    return (
      <div>loading data...</div>
    )
  }
  if (result.isError) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
