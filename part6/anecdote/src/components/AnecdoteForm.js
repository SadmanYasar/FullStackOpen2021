import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`${content} has been added`, 5)
    }

    return(
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createAnecdote: (content) => dispatch(createAnecdote(content)),
        setNotification: (content, timeInSeconds) => dispatch(
            setNotification(content, timeInSeconds)
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
