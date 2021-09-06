import React, { useState } from 'react'

const StatisticLine = ({text, value}) => {
    if (text === "Positive") {
      return(
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      )
    }

    return(
      <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
    )
}



const Statistics = ({good,neutral,bad}) => {
  const total = good+neutral+bad
  const avg = (good-bad)/total
  const positivePercentage = (100/total)*good

  if (total === 0) {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <table>
      <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="Average" value={avg} />
      <StatisticLine text="Positive" value={positivePercentage} />
      </tbody>
    </table>
  )
}

const Button = ({text, onclick}) => {
    return(
      <button onClick={onclick}>{text}</button>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => setGood(good+1)
  const updateNeutral = () => setNeutral(neutral+1)
  const updateBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onclick={updateGood} />
      <Button text="Neutral" onclick={updateNeutral} />
      <Button text="Bad" onclick={updateBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App
