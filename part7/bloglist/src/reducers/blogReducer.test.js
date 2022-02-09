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

  test('can like', () => {
    const state = [
      {
        id: 1,
        title: 'first blog',
        author: 'sy17',
        url: 'https://w3.com',
        likes: 0
      },
      {
        id: 2,
        title: 'second blog',
        author: 'sy17',
        url: 'https://w3.com',
        likes: 0
      }
    ]
    const action = {
      type: 'LIKE',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState[0].likes).toBe(1)
  })

  test('can delete', () => {
    const state = [
      {
        id: '1',
        title: 'first blog',
        author: 'sy17',
        url: 'https://w3.com',
        likes: 0
      },
      {
        id: '2',
        title: 'second blog',
        author: 'sy17',
        url: 'https://w3.com',
        likes: 0
      }
    ]

    const action = {
      type: 'DELETE',
      data: 2
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).not.toContain(state[1])
  })

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
      data: 3
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContain(action.data)
  })

  test.only('can comment', () => {
    const state = [
      {
        id: 1,
        title: 'first blog',
        author: 'sy17',
        url: 'https://github.com',
        likes: 0,
        comments: [
          'test comment'
        ]
      },
      {
        id: 2,
        title: 'second blog',
        author: 'sy18',
        url: 'https://heroku.com',
        likes: 0,
        comments: []
      }
    ]

    const action = {
      type: 'COMMENT',
      comment: 'Second comment',
      blogId: 1
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState[0].comments).toHaveLength(2)
    expect(newState[0].comments).toContain('Second comment')
  })

})