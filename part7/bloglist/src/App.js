import React, { useEffect, useRef } from 'react'
import Toggleable from './components/Toggleable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogOutButton from './components/LogOutButton'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  const byLikes = (firstItem, secondItem) => {
    return secondItem.likes - firstItem.likes
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user === null
        ? <div>
          <p>Login to application</p>
          <LoginForm />
        </div>

        : <div>
          <p>Logged in as {user.name}</p>
          <LogOutButton />

          <Toggleable buttonLabel='Add a blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef}/>
          </Toggleable>

          {blogs
            .sort(byLikes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                own={blog.user.username === user.username}  />
            )}
        </div>
      }
    </div>
  )
}

export default App