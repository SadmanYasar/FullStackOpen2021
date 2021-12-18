import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message}) => {
  if (!message) {
    return null
  }

  return(
    <>
      <p>{message}</p>
    </>
  )
}
const LoginForm = ({username, password, onUserChange, onPasswordChange, onSubmit}) => {
  return(
      <form onSubmit={onSubmit}>
        <div>
          Username: 
          <input 
          type="text" 
          name="Username" 
          value={username}
          onChange={onUserChange} 
          />
        </div>

        <div>
          Password: 
          <input 
          type="password" 
          name="Password"
          value={password} 
          onChange={onPasswordChange} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
  )
}

const LogOutButton = ({onClick}) => {
  return(
    <button onClick={onClick}>Logout</button>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [user, setuser] = useState(null)
  const [message, setmessage] = useState(null)

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
      setmessage('Wrong credentials')
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
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )} 
        </div>}
      

      
    </div>
  )
}

export default App