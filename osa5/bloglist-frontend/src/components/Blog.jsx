import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogservice from '../services/blogs'
import NotificationContext from '../contexts/NotificationContext'

const Blog = ({ blog, user }) => {
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: blogservice.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatchNotification({
        type: 'SET_SUCCESS',
        payload: `Deleted blog '${blog.title}' by ${blog.author}`,
      })
    },
  })
  const likeBlogMutation = useMutation({
    mutationFn: blogservice.like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const [showFull, setShowFull] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  function handleDelete(blog) {
    if (confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog)
    }
  }

  function handleLike(blog) {
    likeBlogMutation.mutate(blog)
  }

  if (!showFull) {
    return (
      <div style={blogStyle} className="blog">
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setShowFull(true)}>show</button>
        </p>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <button onClick={() => setShowFull(false)}>hide</button>
      <p>
        {blog.title} {blog.author}
      </p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>{blog.user.name}</p>
      {user.username === blog.user.username && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
