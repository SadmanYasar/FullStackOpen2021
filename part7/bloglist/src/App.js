import React, { useState, useEffect, useRef } from 'react'
import Toggleable from './components/Toggleable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogOutButton from './components/LogOutButton'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [user, setuser] = useState(null)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const HandleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setuser(user)

    } catch (error) {
      dispatch(setNotification('Wrong credentials', 5, true))
    }
  }

  const HandleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setuser(null)
  }

  const HandleBlogSubmit = async (newBlog) => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) {
      return setuser(null)
    }

    dispatch(addBlog(newBlog, user))
    blogFormRef.current.toggleVisibility()
  }

  const HandleBlogDelete = async (blogToDelete) => {
    try {
      if (!window.confirm(`Delete ${blogToDelete.title} ?`)) {
        return
      }

      await blogService.deleteBlog(blogToDelete.id)

      //setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      dispatch(setNotification(
        `Blog ${blogToDelete.title} has been deleted`,
        5,
        false
      ))

    } catch (error) {
      if (error.response.status === 404) {
        //setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        return
      }

      dispatch(setNotification(error.response.data.error, 5, true))
    }
  }

  const byLikes = (firstItem, secondItem) => {
    return secondItem.likes - firstItem.likes
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>

      {user === null
        ? <div>
          <p>Login to application</p>
          <LoginForm  Login={HandleLogin} />
        </div>

        : <div>
          <p>Logged in as {user.name}</p>
          <LogOutButton onClick={HandleLogOut}/>

          <Toggleable buttonLabel='Add a blog' ref={blogFormRef}>
            <BlogForm Create={HandleBlogSubmit} />
          </Toggleable>

          {blogs
            .sort(byLikes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                Delete={HandleBlogDelete}
                own={blog.user.username === user.username}  />
            )}
        </div>
      }
    </div>
  )
}

export default App