import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route, useMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import login from './services/login'
import MessageBox from './components/MessageBox'
import NotificationContext from './contexts/NotificationContext'
import UserContext from './contexts/UserContext'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'
import NavMenu from './components/NavMenu'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const [user, dispatchUser] = useContext(UserContext)

  useEffect(() => {
    const userJSON = localStorage.getItem('blogUser')
    if (userJSON) {
      const localUser = JSON.parse(userJSON)
      dispatchUser({ type: 'LOG_IN', payload: localUser })
      blogService.setToken(localUser.token)
    }
  }, [])

  const blogRes = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  const userRes = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  const blogMatch = useMatch('/blogs/:id')
  const userMatch = useMatch('/users/:id')

  if (blogRes.isLoading || userRes.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = blogRes.data
  const users = userRes.data

  const selectedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const selectedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const user = await login({ username, password })

      dispatchUser({ type: 'LOG_IN', payload: user })
      setUsername('')
      setPassword('')

      blogService.setToken(user.token)
      localStorage.setItem('blogUser', JSON.stringify(user))
    } catch (err) {
      console.log(err)
      dispatchNotification({
        type: 'SET_ERR',
        payload: 'Wrong username or password',
      })
    }
  }

  if (user === null) {
    return (
      <div className="container">
        <MessageBox />
        <h2>Log in</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div className="container">
      <NavMenu />
      <MessageBox />
      <h2>blogs</h2>

      <Routes>
        <Route path="/" element={<BlogList blogs={sortedBlogs} />} />
        <Route path="/blogs/:id" element={<BlogView blog={selectedBlog} />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route path="/users" element={<UserList users={users} />} />
      </Routes>
    </div>
  )
}

export default App
