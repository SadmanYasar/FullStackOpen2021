import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, Update, Delete, own }) => {
  const [showdetail, setshowdetail] = useState(false)
  const buttonText = showdetail ? 'Hide' : 'View'

  const showWhenVisible = { display: showdetail ? '' : 'none' }

  const toggleBlog = () => {
    setshowdetail(!showdetail)
  }

  const updateLikes = () => {
    Update({ ...blog, likes: blog.likes+1 })
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
  Update: PropTypes.func.isRequired,
  Delete: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog