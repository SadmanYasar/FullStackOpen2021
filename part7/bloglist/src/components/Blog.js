import React from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../index'
import { like, deleteBlog } from '../reducers/blogReducer'
import { logout } from '../reducers/userReducer'

const Blog = ({ blog, own }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const updateLikes = () => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) {
      dispatch(logout())
      history.push('/login')
      return null
    }
    dispatch(like(blog))
  }

  const removeBlog = () => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) {
      dispatch(logout())
      history.push('/login')
      return null
    }
    dispatch(deleteBlog(blog))
  }

  return(
    <div>
      <h1>{blog.title} - {blog.author} </h1>
      <p>URL - {blog.url}</p>
      <p>likes - {blog.likes} <button onClick={updateLikes}>Like</button></p>
      {own && <button onClick={removeBlog}>Delete</button>}
    </div>
  )}

export default Blog