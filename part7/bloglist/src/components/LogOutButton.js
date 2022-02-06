import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LogOutButton = () => {

  const dispatch = useDispatch()

  const HandleLogOut = (event) => {
    event.preventDefault()
    dispatch(logout())
  }
  return(
    <button onClick={HandleLogOut}>Logout</button>
  )
}

export default LogOutButton

