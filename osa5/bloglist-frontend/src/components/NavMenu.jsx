import { Button, Container, Nav, Navbar } from 'react-bootstrap'
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
    <Navbar>
      <Nav>
        <Nav.Link>
          <Link to={'/'}>blogs</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={'/users'}>users</Link>
        </Nav.Link>
        <Navbar.Text className="no-wrap">
          <p>{user.name} logged in</p>
        </Navbar.Text>
        <Container>
          <Button onClick={logOut}>Log out</Button>
        </Container>
      </Nav>
    </Navbar>
  )
}
