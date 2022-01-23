import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const byVotes = (prevVal, currentVal) => {
        return currentVal.votes - prevVal.votes
    }

    return(
    <div>
      {anecdotes.sort(byVotes).map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote.id))
            dispatch(setNotification(`you voted ${anecdote.content}`))
            setTimeout(() => {
              dispatch(removeNotification())
            }, 5000)
          }
          }
        />
      )}
    </div>
    )
}

export default AnecdoteList
