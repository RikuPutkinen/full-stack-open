import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'
import BlogForm from './components/BlogForm'
import MessageBox from './components/MessageBox'
import Togglable from './components/Togglable'
import NotificationContext from './contexts/NotificationContext'
import UserContext from './contexts/UserContext'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

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

  const res = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (res.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = res.data
  console.log(blogs)
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

  function logOut() {
    localStorage.removeItem('blogUser')
    blogService.setToken(null)
    dispatchUser({ type: 'LOG_OUT' })
  }

  if (user === null) {
    return (
      <>
        <MessageBox />
        <h2>Log in</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleLogin}
        />
      </>
    )
  }

  return (
    <Router>
      <MessageBox />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logOut}>Log out</button>

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/users" element={<UserList blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default App
