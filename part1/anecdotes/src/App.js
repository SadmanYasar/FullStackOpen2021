import React, { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Winner = ({anecdotes, points}) => {
  const highestPoint = Math.max(...points)
  const winningAnecdote = anecdotes[points.indexOf(highestPoint)]
  
  if ( highestPoint === 0 ) {
    return(
      <p>Please vote an anecdote</p>
    )
  }
  return(
      <div><p>{winningAnecdote}</p><p>Has {highestPoint} votes</p></div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  //state to set point for an anecdote if voted
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const GenerateAnecdoteIndex = () => 
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const Vote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }
  
  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <Button text="Vote" onClick={Vote} />
      <Button text="Next Anectode" onClick={GenerateAnecdoteIndex} />
      <Header text="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App