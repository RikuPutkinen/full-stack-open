import { useState, useEffect, useContext } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'
import BlogForm from './components/BlogForm'
import MessageBox from './components/MessageBox'
import Togglable from './components/Togglable'
import NotificationContext from './contexts/NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, dispatchNotification] = useContext(NotificationContext)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
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
    setUser(null)
  }

  function addBlog(newBlog) {
    blogService
      .create(newBlog)
      .then(res => {
        dispatchNotification({
          type: 'SET_SUCCESS',
          payload: `A new blog "${res.title}" by ${res.author} added`,
        })
        setBlogs([...blogs, res])
        setBlogFormVisible(false)
      })
      .catch(e => {
        const error = e.response.data.error
        console.error(error)
        dispatchNotification({ type: 'SET_FAIL', payload: `Error: ${error}` })
      })
  }

  function deleteBlog(blogToRemove) {
    if (
      confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    ) {
      blogService.deleteBlog(blogToRemove.id).then(res => {
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
      })
    }
  }

  function likeBlog(blogToLike) {
    console.log('L:', blogToLike.likes)
    blogService.like(blogToLike).then(res =>
      setBlogs(
        blogs.map(blog => {
          if (blog.id.toString() === blogToLike.id.toString()) {
            return res
          } else {
            return blog
          }
        })
      )
    )
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
    <div>
      <MessageBox />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logOut}>Log out</button>
      <Togglable
        visible={blogFormVisible}
        buttonLabel={'new blog'}
        handleHide={() => setBlogFormVisible(false)}
        handleShow={() => setBlogFormVisible(true)}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDelete={() => deleteBlog(blog)}
          handleLike={() => likeBlog(blog)}
        />
      ))}
    </div>
  )
}

export default App
