import { Button } from '@chakra-ui/react'
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
    <Button colorScheme="whiteAlpha.50" p={3} variant="link" onClick={HandleLogOut} >Logout</Button>
  )
}

export default LogOutButton

