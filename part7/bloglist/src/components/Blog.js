import React from 'react'
import { useDispatch } from 'react-redux'
import { like, deleteBlog, commentBlog } from '../reducers/blogReducer'

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(blog, comment))
  }

  return(
    <div>
      <h1>{blog.title} - {blog.author} </h1>
      <p>URL - {blog.url}</p>
      <p>likes - {blog.likes} <button onClick={updateLikes}>Like</button></p>
      {own && <button onClick={removeBlog}>Delete</button>}
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='comment' />
        <button type='submit'>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, i) =>
          <li key={i}>{c}</li>)}
      </ul>
    </div>
  )}

export default Blog