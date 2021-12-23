import React, { useState, useEffect, useRef } from 'react'
import Toggleable from './components/Toggleable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogOutButton from './components/LogOutButton'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setuser] = useState(null)
  const [message, setmessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
      setmessage({
        message: 'Wrong credentials', 
        type: 'error'
      })
      setTimeout(() => {
        setmessage(null)
      }, 5000);
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

    try {
      const blog = await blogService.create(newBlog)

      blogFormRef.current.toggleVisibility()

      setmessage({
        message: `Blog ${blog.title} has been added`,
        type: 'success'
      })
      setBlogs(blogs.concat(blog))
      setTimeout(() => {
        setmessage(null)
      }, 3000);
    } catch (error) {
      setmessage({
        message: error.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setmessage(null)
      }, 5000);
    }
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message}/>

      {user === null 
      ? <div>
          <p>Login to application</p>
          <Toggleable buttonLabel='login'>
            <LoginForm  Login={HandleLogin} />
          </Toggleable>
        </div>
      
      : <div>
          <p>Logged in as {user.name}</p>
          <LogOutButton onClick={HandleLogOut}/>

          <Toggleable buttonLabel='Add a blog' ref={blogFormRef}>
            <BlogForm Create={HandleBlogSubmit} />
          </Toggleable>

          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )} 
        </div>}
      

      
    </div>
  )
}

export default App