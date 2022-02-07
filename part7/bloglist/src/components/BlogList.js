import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const byLikes = (firstItem, secondItem) => {
    return secondItem.likes - firstItem.likes
  }
  return(
    <>
      {blogs
        .sort(byLikes)
        .map(blog =>
          <div key={blog.id} className='blog' >
            <Link to={`/blogs/${blog.id}`} >
              {blog.title} - {blog.author}
            </Link>
          </div>
        )}
    </>
  )
}

export default BlogList
