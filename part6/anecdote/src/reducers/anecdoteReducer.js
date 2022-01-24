const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id === id ? changedAnecdote : a);
  
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state;
  }
}

export const initializeAnecdotes = (data) => {
  return({
    type: 'INIT_ANECDOTES',
    data
  })
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (data) => {
  return(
    {
      type: 'NEW_ANECDOTE',
      data
    }
  )
}

export default anecdoteReducer