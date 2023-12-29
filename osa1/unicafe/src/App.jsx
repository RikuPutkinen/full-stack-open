import { useState } from 'react'

function Button({ handleClick, text}){
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function Statistics({ score }){
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {score.good}</p>
      <p>Neutral: {score.neutral}</p>
      <p>Bad: {score.bad}</p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <Statistics score={{good, neutral, bad}}/>
    </>
  )
}

export default App