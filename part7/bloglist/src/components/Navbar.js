import React from 'react'
import { Link } from 'react-router-dom'
import LogOutButton from './LogOutButton'

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

export default Navbar
