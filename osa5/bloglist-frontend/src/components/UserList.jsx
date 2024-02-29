import _ from 'lodash'

export default function UserList({ blogs }) {
  const countedUsers = _.countBy(blogs, 'user.username')
  console.log(countedUsers)
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {Object.keys(countedUsers).map(key => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{countedUsers[key]}</td>
              </tr>
            )
          })}
        </thead>
      </table>
    </>
  )
}
