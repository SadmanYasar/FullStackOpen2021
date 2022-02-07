import userService from '../services/users'

const allUserReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data

  case 'ADD_BLOG_TO_USER':{
    return state.map(u => u.id === action.userID
      ? { ...u, blogs: u.blogs.concat(action.blog) }
      : u )
  }

  case 'REMOVE_BLOG_FROM_USER': {
    return state.map(u => {
      return {
        ...u,
        blogs: u.blogs.filter(b => b.id !== action.id)
      }
    })
  }

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

export const addBlogToUser = (userID, blog) => {
  return({
    type: 'ADD_BLOG_TO_USER',
    userID,
    blog
  })
}

export const deleteBlogFromUser = (id) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    id
  }
}

export default allUserReducer
