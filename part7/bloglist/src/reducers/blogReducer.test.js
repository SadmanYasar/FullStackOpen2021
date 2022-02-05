import deepFreeze from 'deep-freeze'
import blogReducer from './blogReducer'

describe('Blog reducer', () => {
  test('sets undefined state to initialstate', () => {
    const action = {
      type: 'SOME ACTION',
      data: {}
    }

    const newState = blogReducer(undefined, action)
    expect(newState).toHaveLength(0)
  })

  /* test('can vote', () => {
    const state = [
      {
        content: 'first anecdote',
        id: 1,
        votes: 0
      },
      {
        content: 'second anecdote',
        id: 2,
        votes: 0
      }
    ]
    const action = {
      type: 'VOTE',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState[0].votes).toBe(1)
  }) */

  test('can add new blog', () => {
    const state = [
      {
        id: 1,
        title: 'first blog',
        author: 'sy17',
        url: 'https://github.com',
        likes: 0
      },
      {
        id: 2,
        title: 'second blog',
        author: 'sy18',
        url: 'https://heroku.com',
        likes: 0
      }
    ]

    const action = {
      type: 'NEW_BLOG',
      data: {
        id: 3,
        title: 'third blog',
        author: 'sy19',
        url: 'www.someurl.com',
        likes: 10
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContain(action.data)
  })
})