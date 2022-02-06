import userService from '../services/users'

const allUserReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data

  default:
    return state
  }
}

export const initAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default allUserReducer
