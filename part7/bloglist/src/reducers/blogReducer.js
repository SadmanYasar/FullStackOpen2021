import blogService from '../services/blogs'
import { addBlogToUser, deleteBlogFromUser } from './allUserReducer'
import { setNotification } from './notificationReducer'
import { logout } from './userReducer'

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

  case 'COMMENT': {
    const id = action.data.id
    const updatedBlog = state.find((blog) => blog.id === id)
    const changedBlog = {
      ...updatedBlog,
      comments: action.data.comments
    }
    return state.map((blog) => (blog.id !== id ? blog : changedBlog))
  }

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

      if (!window.localStorage.getItem('loggedBlogAppUser')) {
        dispatch(logout())
        return null
      }

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

      dispatch(addBlogToUser(
        newBlog.user.id,
        {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
          id: newBlog.id
        }))

      dispatch(setNotification(`Blog ${newBlog.title} has been added`, 3, false))

    } catch (error) {
      dispatch(setNotification(`Cannot add blog ${blog.title}`, 5, true))
    }
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    try {

      if (!window.localStorage.getItem('loggedBlogAppUser')) {
        dispatch(logout())
        return null
      }

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

      if (!window.localStorage.getItem('loggedBlogAppUser')) {
        dispatch(logout())
        return null
      }

      await blogService.deleteBlog(blog.id)

      dispatch({
        type: 'DELETE',
        data: blog.id
      })

      dispatch(deleteBlogFromUser(blog.id))

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

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {

      if (!window.localStorage.getItem('loggedBlogAppUser')) {
        dispatch(logout())
        return null
      }

      const updatedBlog = await blogService.updateBlog({
        ...blog,
        comments: blog.comments.concat(comment)
      })

      updatedBlog.user = blog.user
      dispatch({
        type: 'COMMENT',
        data: updatedBlog
      })
      dispatch(setNotification('Comment added', 2, false))

    } catch (error) {
      console.log(error)
      dispatch(setNotification('Could not update', 5, true))
    }
  }
}

export default blogReducer