import { useState } from 'react'
import Proptypes from 'prop-types'

export default function BlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  function handleNewBlogChange(e) {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    })
  }

  function addBlog(e) {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={addBlog}>
      <h3>Create new</h3>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleNewBlogChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleNewBlogChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleNewBlogChange}
        />
      </div>
      <button>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: Proptypes.func.isRequired
}