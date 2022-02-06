import React from 'react'
import { Link } from 'react-router-dom'

export const User = ({ user }) => {
  if (!user) {
    return null
  }
  return(
    <div>
      <h1>{user.username}</h1>
      <p>Added blogs</p>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

const Users = ({ allUsers }) => {

  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {allUsers.map(u =>
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
