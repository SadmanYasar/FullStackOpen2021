import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { like } from '../reducers/blogReducer'

const Blog = ({ blog, Delete, own }) => {
  const [showdetail, setshowdetail] = useState(false)
  const buttonText = showdetail ? 'Hide' : 'View'

  const showWhenVisible = { display: showdetail ? '' : 'none' }

  const dispatch = useDispatch()

  const toggleBlog = () => {
    setshowdetail(!showdetail)
  }

  const updateLikes = () => {
    dispatch(like(blog))
  }

  const deleteBlog = () => {
    Delete(blog)
  }

  return(
    <div className='blog'>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleBlog}>{buttonText}</button></p>
      </div>

      <div style={showWhenVisible} className='togglable'>
        <p>URL - {blog.url}</p>
        <p>likes - {blog.likes} <button onClick={updateLikes}>Like</button></p>
        {own && <button onClick={deleteBlog}>Delete</button>}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  Delete: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog