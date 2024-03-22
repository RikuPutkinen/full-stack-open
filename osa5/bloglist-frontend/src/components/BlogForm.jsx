import { Form, Button } from 'react-bootstrap'
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
    <Form onSubmit={addBlog}>
      <h3>Create new</h3>
      <Form.Group>
        <Form.Label htmlFor="title">title:</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleNewBlogChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="author">author:</Form.Label>
        <Form.Control
          type="text"
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleNewBlogChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="url">url:</Form.Label>
        <Form.Control
          type="text"
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleNewBlogChange}
        />
      </Form.Group>
      <Button type="submit">create</Button>
    </Form>
  )
}
