import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'
import BlogForm from './components/BlogForm'
import MessageBox from './components/MessageBox'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userJSON = localStorage.getItem('blogUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const user = await login({ username, password })

      setUser(user)
      setUsername('')
      setPassword('')

      blogService.setToken(user.token)
      localStorage.setItem('blogUser', JSON.stringify(user))
    } catch(err) {
      console.log(err)
      showMessage('Wrong username or password', false)
    }
  }

  function logOut() {
    localStorage.removeItem('blogUser')
    setUser(null)
  }

  function addBlog(newBlog) {
    blogService
      .create(newBlog)
      .then(res => {
        showMessage(`A new blog "${res.title}" by ${res.author} added`, true)
        setBlogs([...blogs, res])
        setBlogFormVisible(false)
      })
  }

  function deleteBlog(blogToRemove) {
    if (confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      blogService
        .deleteBlog(blogToRemove.id)
        .then(res => {
          setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        })
    }
  }

  function showMessage(message, success) {
    setMessage(message)
    setSuccess(success)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  if (user === null) {
    return (
      <>
        <MessageBox message={message} success={success} />
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
    <div>
      <MessageBox message={message} success={success} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logOut}>Log out</button>
      <Togglable
        visible={blogFormVisible}
        buttonLabel={'new blog'}
        handleHide={() => setBlogFormVisible(false)}
        handleShow={() => setBlogFormVisible(true)}
      >
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleDelete={() => deleteBlog(blog)} />
      )}
    </div>
  )
}

export default App