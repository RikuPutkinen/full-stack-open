import { useContext } from 'react'
import blogService from '../services/blogs'
import UserContext from '../contexts/UserContext'
import { Link } from 'react-router-dom'

export default function NavMenu() {
  const [user, dispatchUser] = useContext(UserContext)

  function logOut() {
    localStorage.removeItem('blogUser')
    blogService.setToken(null)
    dispatchUser({ type: 'LOG_OUT' })
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>blogs</Link>
        </li>
        <li>
          <Link to={'/users'}>users</Link>
        </li>
        <li>
          <p>{user.name} logged in</p>
        </li>
        <li>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
    </nav>
  )
}
