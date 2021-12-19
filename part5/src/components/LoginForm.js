import React from 'react'

const LoginForm = ({username, password, onUserChange, onPasswordChange, onSubmit}) => {
    return(
        <form onSubmit={onSubmit}>
          <div>
            Username: 
            <input 
            type="text" 
            name="Username" 
            value={username}
            onChange={onUserChange} 
            />
          </div>
  
          <div>
            Password: 
            <input 
            type="password" 
            name="Password"
            value={password} 
            onChange={onPasswordChange} 
            />
          </div>
          <button type="submit">Login</button>
        </form>
    )
  }

export default LoginForm  