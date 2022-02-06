import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [...state, action.data]

  case 'LIKE': {
    const blogToLike = state.find(b => b.id === action.data.id)
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }

    return state.map(b => b.id === action.data.id ? updatedBlog : b)
  }

  case 'DELETE':
    return state.filter(b => b.id !== String(action.data))

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      newBlog.user = {
        id: newBlog.user,
        username: user.username,
        name: user.name,
      }
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(setNotification(`Blog ${newBlog.title} has been added`, 3, false))

    } catch (error) {
      dispatch(setNotification(`Cannot add blog ${blog.title}`, 5, true))
    }
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog({
        ...blog,
        likes: blog.likes + 1
      })

      updatedBlog.user = blog.user
      dispatch({
        type: 'LIKE',
        data: updatedBlog
      })
      dispatch(setNotification(`${blog.title} has been updated`, 2, false))

    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5, true))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id)

      dispatch({
        type: 'DELETE',
        data: blog.id
      })
      dispatch(setNotification(
        `Blog ${blog.title} has been deleted`,
        5,
        false
      ))

    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: 'DELETE',
          data: blog.id
        })
        return
      }

      dispatch(setNotification(
        `Could not delete blog ${blog.title}`,
        5,
        true)
      )
    }
  }
}

export default blogReducer