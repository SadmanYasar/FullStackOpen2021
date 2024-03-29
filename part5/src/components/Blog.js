import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, Update, Delete }) => {
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

  const username = blog.user.username
  const userlogged = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

  return(
    <div className='blog'>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleBlog}>{buttonText}</button></p>
      </div>

      <div style={showWhenVisible} className='togglable'>
        <p>URL - {blog.url}</p>
        <p>likes - {blog.likes} <button onClick={updateLikes}>Like</button></p>
        {username === userlogged.username
          ? <>
            <button onClick={deleteBlog}>Delete</button>
          </>
          : <></>}

      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  Update: PropTypes.func.isRequired,
  Delete: PropTypes.func.isRequired
}

export default Blog