import React, { useState } from 'react'

const Display = ({good,neutral,bad}) => {
  console.log(good, neutral, bad)
  return(
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
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
      <Display good={good} neutral={neutral} bad={bad} />
      <h1>Give Feedback</h1>
      <Button text="Good" onclick={() => updateGood} />
      <Button text="Neutral" onclick={() => updateNeutral} />
      <Button text="Bad" onclick={() => updateBad} />
      
    </div>
  )
}

export default App
