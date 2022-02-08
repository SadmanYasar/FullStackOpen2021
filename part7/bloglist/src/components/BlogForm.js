import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

  const HandleTitle = ({ target }) => settitle(target.value)
  const HandleAuthor = ({ target }) => setauthor(target.value)
  const HandleURL = ({ target }) => seturl(target.value)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const Add = (event) => {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }

    dispatch(addBlog(newBlog, user))
    blogFormRef.current.toggleVisibility()

    settitle('')
    setauthor('')
    seturl('')
  }

  return(
    <form onSubmit={Add}>
      <div>
            Title:
        <input
          id='title'
          type="text"
          name="Title"
          value={title}
          onChange={HandleTitle}
        />
      </div>

      <div>
            Author:
        <input
          id='author'
          type="text"
          name="Author"
          value={author}
          onChange={HandleAuthor}
        />
      </div>

      <div>
            URL:
        <input
          id='url'
          type="text"
          name="URL"
          value={url}
          onChange={HandleURL}
          required
        />
      </div>
      <button id='blog-button' type="submit">Add</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired
}
export default BlogForm
