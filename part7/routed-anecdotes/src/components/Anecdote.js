import React from 'react'
const Anecdote = ({ anecdote }) => {
    return(
      <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see {anecdote.info}</p>
      </div>
    )
}

export default Anecdote

