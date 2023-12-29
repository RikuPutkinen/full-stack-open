import { useState } from 'react'

function Anecdote({ anecdote, votes}) {
  return (
    <div>
        <p>{anecdote}</p>
        <p>{votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ])

  const mostVotes = votes.findIndex(n => n === Math.max(...votes))

  function random(n){
    const ans = Math.floor(Math.random() * n)
    console.log(ans)
    return ans
  }

  function randomIndex() {
    setSelected(random(anecdotes.length))
  }

  function placeVote(index) {
    const newArr = votes.map((count, i) => {
      if (i === index) return count + 1
      return count
    })

    setVotes(newArr)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <div>
        <button onClick={() => placeVote(selected)}>Vote</button>
        <button onClick={randomIndex}>Next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[mostVotes]} votes={votes[mostVotes]}/>
    </div>
  )
}

export default App