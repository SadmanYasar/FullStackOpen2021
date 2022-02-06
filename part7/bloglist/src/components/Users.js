import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.allUsers)

  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.map(u =>
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
