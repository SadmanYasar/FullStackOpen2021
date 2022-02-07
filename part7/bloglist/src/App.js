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
  useRouteMatch
} from 'react-router-dom'
import Users from './components/Users'
import { User } from './components/Users'

import { initAllUsers } from './reducers/allUserReducer'

const Navbar = () => {
  const padding = {
    padding: 5
  }
  return(
    <div>
      <Link style={padding} to='/' >Home</Link>
      <Link style={padding} to='/users' >Users</Link>
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
    dispatch(initializeBlogs())
    dispatch(initUser())
    dispatch(initAllUsers())
  }, [])

  const byLikes = (firstItem, secondItem) => {
    return secondItem.likes - firstItem.likes
  }

  const match = useRouteMatch('/users/:id')
  const foundUser = match
    ? allUsers.find(u => u.id === match.params.id)
    : null

  return (
    <>
      <Navbar />
      <div>
        <h2>Blogs</h2>
        <Notification />

        {user === null
          ? <LoginForm />

          : <div>
            <p>Logged in as {user.name}</p>
            <LogOutButton />

            <Toggleable buttonLabel='Add a blog' ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef} />
            </Toggleable>

            {blogs
              .sort(byLikes)
              .map(blog => <Blog
                key={blog.id}
                blog={blog}
                own={blog.user.username === user.username} />
              )}
          </div>}
      </div>
      <Switch>
        <Route path='/users/:id'>
          <User user={foundUser} />
        </Route>
        <Route path='/users'>
          <Users allUsers={allUsers} />
        </Route>
      </Switch>
    </>
  )
}

export default App