import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'
import BlogForm from './components/BlogForm'
import MessageBox from './components/MessageBox'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
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
      showMessage("Wrong username or password", false)
    }
  }

  function logOut() {
    localStorage.removeItem('blogUser')
    setUser(null)
  }

  function handleNewBlogChange(e) {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    })
  }

  function addBlog(e) {
    e.preventDefault()
    blogService.create(newBlog)
    showMessage(`A new blog "${newBlog.title}" by ${newBlog.author} added`, true)
    setBlogs([...blogs, newBlog])
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
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
      <h3>Create new</h3>
      <BlogForm
        newBlog={newBlog}
        handleChange={handleNewBlogChange}
        handleSubmit={addBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App