import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = ( ) => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const HandleUserName = ({ target }) => setusername(target.value)

  const HandlePassword = ({ target }) => setpassword(target.value)

  const dispatch = useDispatch()

  const loginUser = (event) => {
    event.preventDefault()

    dispatch(login({
      username, password
    }))

    setusername('')
    setpassword('')
  }


  return(
    <><p>Login to application</p>
      <form onSubmit={loginUser}>
        <div>
        Username:
          <input
            id='username'
            type="text"
            name="Username"
            value={username}
            onChange={HandleUserName} />
        </div>

        <div>
        Password:
          <input
            id='password'
            type="password"
            name="Password"
            value={password}
            onChange={HandlePassword} />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form></>
  )
}

export default LoginForm