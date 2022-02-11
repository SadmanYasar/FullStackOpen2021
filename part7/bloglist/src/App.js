import React, { useEffect, useRef } from 'react'
import Toggleable from './components/Toggleable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from 'react-router-dom'
import Users from './components/Users'
import { User } from './components/Users'

import { initAllUsers } from './reducers/allUserReducer'
import BlogList from './components/BlogList'
import Navbar from './components/Navbar'
import { Box, Container } from '@chakra-ui/react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

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
    <Container maxW="container.xl" p={0}>

      <Box position="sticky" top={0} w="full">
        <Navbar user={user} />
        <Notification />
      </Box>

      <Switch>
        <Route path='/users/:id'>
          <User user={foundUser} />
        </Route>

        <Route path='/blogs/:id'>
          {user === null
            ? <Redirect to='/' />
            : <Blog
              blog={foundBlog}
              own={foundBlog
                ? foundBlog.user.username === user.username
                : null}
            /> }
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

            : <Box width="full">
              <Toggleable
                buttonlabel={<MdOutlineAddCircleOutline />}
                ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Toggleable>
              <BlogList blogs={blogs} />
            </Box>}
        </Route>
      </Switch>
    </Container>
  )
}

export default App