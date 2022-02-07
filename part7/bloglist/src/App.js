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
import {
  Switch,
  Link,
  Route,
  useRouteMatch,
  Redirect
} from 'react-router-dom'
import Users from './components/Users'
import { User } from './components/Users'

import { initAllUsers } from './reducers/allUserReducer'
import BlogList from './components/BlogList'

const Navbar = ({ user }) => {
  const padding = {
    padding: 5
  }
  return(
    <div>
      <Link style={padding} to='/' >Home</Link>
      <Link style={padding} to='/users' >Users</Link>
      {user
        ? <>
          <em style={padding}>{user.username} logged in</em>
          <LogOutButton />
        </>
        : <Link style={padding} to="/login">Login</Link>
      }
    </div>
  )
}
const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.allUsers)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
    dispatch(initAllUsers())
  }, [])

  const userMatch = useRouteMatch('/users/:id')
  const foundUser = userMatch
    ? allUsers.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <>
      <Navbar user={user} />
      <div>
        <h2>Blogs</h2>
        <Notification />
      </div>

      <Switch>
        <Route path='/users/:id'>
          <User user={foundUser} />
        </Route>

        <Route path='/blogs/:id'>
          <Blog
            blog={foundBlog}
            own={foundBlog && user
              ? foundBlog.user.username === user.username
              : null}
          />
        </Route>

        <Route path='/users'>
          <Users allUsers={allUsers} />
        </Route>

        <Route path='/login'>
          {user === null
            ? <LoginForm />
            : <Redirect to='/' />}
        </Route>

        <Route path='/'>
          {user === null
            ? <Redirect to='/login' />

            : <div>
              <Toggleable buttonLabel='Add a blog' ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Toggleable>
              <BlogList blogs={blogs} />
            </div>}
        </Route>
      </Switch>
    </>
  )
}

export default App