import React, {useState} from 'react'

const Blog = ({blog, Update}) => {
  const [showdetail, setshowdetail] = useState(false)
  const buttonText = showdetail ? 'Hide' : 'View'

  const showWhenVisible = {display: showdetail ? '' : 'none'}

  const toggleBlog = () => {
    setshowdetail(!showdetail)
  } 

  const updateLikes = () => {
    Update({...blog, likes: blog.likes+1})
  }

  return(
  <div className='blog'>
    <div>
      <p>{blog.title} - {blog.author} <button onClick={toggleBlog}>{buttonText}</button></p>
    </div>

    <div style={showWhenVisible}>
      <p>URL - {blog.url}</p>
      <p>likes - {blog.likes} <button onClick={updateLikes}>like</button></p>
    </div>
  </div> 
)}

export default Blog