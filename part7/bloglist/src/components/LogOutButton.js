import React from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../index'
import { logout } from '../reducers/userReducer'

const LogOutButton = () => {

  const dispatch = useDispatch()

  const HandleLogOut = (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/login')
  }
  return(
    <button onClick={HandleLogOut}>Logout</button>
  )
}

export default LogOutButton

