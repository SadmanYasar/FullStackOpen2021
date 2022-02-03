import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notificationReducer', () => {
  test('stores action data to state', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      data: 'hello world'
    }

    const state = 'some text'
    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toBe('hello world')
  })

  test('stores action data to state if state undefined', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      data: 'hello world'
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toBe('hello world')
  })

})