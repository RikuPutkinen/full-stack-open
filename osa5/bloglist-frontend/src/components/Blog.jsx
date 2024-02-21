import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const [showFull, setShowFull] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!showFull) {
    return (
      <div style={blogStyle} className='blog'>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setShowFull(true)}>show</button>
        </p>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      <button onClick={() => setShowFull(false)}>hide</button>
      <p>{blog.title} {blog.author}</p>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.user.name}</p>
      {user.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default Blog