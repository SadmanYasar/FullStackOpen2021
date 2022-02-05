import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notificationReducer', () => {
  test('stores action data to state', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      message: 'hello world',
      isError: true
    }

    const state = 'some text'
    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toEqual({ message: 'hello world', isError: true })
  })

  test('stores action data to state if state undefined', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      message: 'hello world',
      isError: false
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual({ message: 'hello world', isError: false })
  })

})