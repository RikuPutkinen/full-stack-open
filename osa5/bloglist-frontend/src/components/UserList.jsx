import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UserList({ users }) {
  const countedUsers = users.map(user => {
    return {
      ...user,
      amountOfBlogs: user.blogs.length,
    }
  })

  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {countedUsers.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.amountOfBlogs}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
