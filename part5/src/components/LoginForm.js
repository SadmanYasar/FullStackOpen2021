import React, {useState} from 'react'

const LoginForm = ({Login}) => {
  const [username, setusername] = useState('')  
  const [password, setpassword] = useState('')

  const HandleUserName = ({target}) => setusername(target.value)

  const HandlePassword = ({target}) => setpassword(target.value)

  const login = (event) => {
    event.preventDefault()
    Login({
      username, password
    })

    setusername('')
    setpassword('')
  }
  
  
  return(
        <form onSubmit={login}>
          <div>
            Username: 
            <input 
            type="text" 
            name="Username" 
            value={username}
            onChange={HandleUserName} 
            />
          </div>
  
          <div>
            Password: 
            <input 
            type="password" 
            name="Password"
            value={password} 
            onChange={HandlePassword} 
            />
          </div>
          <button type="submit">Login</button>
        </form>
    )
  }

export default LoginForm  