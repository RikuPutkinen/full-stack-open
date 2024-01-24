import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const user = await login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('blogUser', JSON.stringify(user))
    } catch(err) {
      console.log(err)
    }
  }

  function logOut() {
    localStorage.removeItem('blogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <>
        <h2>Log in</h2>
        <LoginForm 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logOut}>Log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App