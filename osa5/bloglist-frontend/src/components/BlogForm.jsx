import { useState, useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import NotificationContext from '../contexts/NotificationContext'

import blogService from '../services/blogs'

export default function BlogForm() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatchNotification({
        type: 'SET_SUCCESS',
        payload: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
      })
    },
    onError: e => {
      dispatchNotification({
        type: 'SET_FAIL',
        payload: `Error: ${e.response.data.error}`,
      })
    },
  })

  function handleNewBlogChange(e) {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    })
  }

  function addBlog(e) {
    e.preventDefault()
    newBlogMutation.mutate(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
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
