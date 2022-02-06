import userReducer from './userReducer'

describe('User reducer', () => {
  test('sets state to empty object if undefined', () => {
    const action = {
      type: 'TEST',
      data: 'Arto Hellas'
    }

    const newState = userReducer(undefined, action)
    expect(newState).toBe(null)
  })

  test('can restore user', () => {
    const user = {
      name: 'Carl',
      username: 'Johnson',
      token: 'xyz'
    }

    const action = {
      type: 'INIT_USER',
      data: user
    }

    const newState = userReducer(undefined, action)
    expect(newState).toEqual(user)
  })

  test('can login', () => {
    const user = {
      name: 'Carl',
      username: 'Johnson',
      token: 'xyz'
    }

    const action = {
      type: 'LOGIN',
      data: user
    }

    const newState = userReducer(null, action)
    expect(newState).toEqual(user)
  })

  test('can logout', () => {
    const state = {
      name: 'Carl',
      username: 'Johnson',
      token: 'xyz'
    }

    const action = {
      type: 'LOGOUT',
      data: null
    }

    const newState = userReducer(state, action)
    expect(newState).toBe(null)
  })

})
