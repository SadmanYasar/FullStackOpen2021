import React, { useEffect, useRef } from 'react'
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
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  //const [user, setuser] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  const HandleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      //setuser(user)

    } catch (error) {
      dispatch(setNotification('Wrong credentials', 5, true))
    }
  }

  const HandleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    //setuser(null)
  }

  /*   const HandleBlogSubmit = async (newBlog) => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) {
      return setuser(null)
    }

    dispatch(addBlog(newBlog, user))
    blogFormRef.current.toggleVisibility()
  } */

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