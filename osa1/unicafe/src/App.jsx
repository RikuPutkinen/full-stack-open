import { useState } from 'react'

function round(num, decimals){
  return Math.round(num * Math.pow(10,decimals)) / Math.pow(10, decimals)
}

function Button({ handleClick, text }){
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function StatisticLine({text, value}){
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function Statistics({ score }){
  const { good, neutral, bad } = score
  const total = good + neutral + bad
  const average = (good + (-1 * bad)) / total
  const positive = good / total * 100

  if (
    good === 0 &&
    neutral === 0 &&
    bad === 0
  ) return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"All"} value={total} />
          <StatisticLine text={"Average"} value={round(average, 2)} />
          <StatisticLine text={"Positive"} value={round(positive, 2) + " %"} />
        </tbody>
      </table>
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