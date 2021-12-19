import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogOutButton from './components/LogOutButton'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [user, setuser] = useState(null)
  const [message, setmessage] = useState(null)
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

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

  const HandleUserName = (event) => {
    setusername(event.target.value)
  }

  const HandlePassword = (event) => {
    setpassword(event.target.value)
  }

  const HandleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setuser(user)
      setusername('')
      setpassword('')
      
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

  const HandleTitle = (event) => {
    settitle(event.target.value)
  }

  const HandleAuthor = (event) => {
    setauthor(event.target.value)
  }
  const HandleURL = (event) => {
    seturl(event.target.value)
  }

  const HandleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({title, author, url})
      settitle('')
      setauthor('')
      seturl('')
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
          <LoginForm 
          username={username}
          password={password}
          onUserChange={HandleUserName} 
          onPasswordChange={HandlePassword}
          onSubmit={HandleLogin} 
          />
        </div>
      
      : <div>
          <p>Logged in as {user.name}</p>
          <LogOutButton onClick={HandleLogOut}/>
          <BlogForm
          title={title}
          author={author}
          url={url}
          onTitleChange={HandleTitle} 
          onAuthorChange={HandleAuthor}
          onUrlChange={HandleURL}
          onSubmit={HandleBlogSubmit}/>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )} 
        </div>}
      

      
    </div>
  )
}

export default App