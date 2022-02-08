import React from 'react'
import { useDispatch } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, own }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const updateLikes = () => {
    dispatch(like(blog))
  }

  const removeBlog = () => {
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