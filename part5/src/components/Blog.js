import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [showdetail, setshowdetail] = useState(false)
  const buttonText = showdetail ? 'Hide' : 'View'

  const showWhenVisible = {display: showdetail ? '' : 'none'}

  const toggleBlog = () => {
    setshowdetail(!showdetail)
  } 
  
  return(
  <div className='blog'>
    <div>
      <p>{blog.title} - {blog.author} <button onClick={toggleBlog}>{buttonText}</button></p>
    </div>

    <div style={showWhenVisible}>
      <p>URL - {blog.url}</p>
      <p>likes - {blog.likes} <button>like</button></p>
    </div>
  </div> 
)}

export default Blog