import { useState } from 'react'

function round(num, decimals){
  return Math.round(num * Math.pow(10,decimals)) / Math.pow(10, decimals)
}

function Button({ handleClick, text}){
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function Statistics({ score }){
  const { good, neutral, bad } = score
  const total = good + neutral + bad
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {round((good + (-1 * bad)) / total, 2)}</p>
      <p>Postive: {round(good / total * 100, 2)} %</p>
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