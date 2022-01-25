import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const addVote = () => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={addVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if (state.filter === 'ALL' || '') {
        return state.anecdotes
      }

      const re = new RegExp(state.filter, 'i')
      return state.anecdotes.filter(a => re.test(a.content))
    })

    const byVotes = (prevVal, currentVal) => {
        return currentVal.votes - prevVal.votes
    }

    return(
    <div>
      {anecdotes.sort(byVotes).map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </div>
    )
}

export default AnecdoteList
