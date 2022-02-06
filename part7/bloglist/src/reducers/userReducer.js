import blogService from '../services/blogs'

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

export default userReducer
