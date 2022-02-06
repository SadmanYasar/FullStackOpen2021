import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data

  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    return action.data

  default:
    return state
  }
}

export const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'INIT_USER',
      data: user
    }
  }

  return {
    type: 'INIT_USER',
    data: null
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })

    } catch (error) {
      dispatch(setNotification('Wrong credentials', 5, true))
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOGOUT',
    data: null
  }
}

export default userReducer
