import { useState } from "react"
import blogservice from '../services/blogs'

const Blog = ({ blog, user, handleDelete }) => {
  const [likes, setlikes] = useState(blog.likes)
  const [showFull, setShowFull] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  function handleLike(blog) {
    console.log("L:", likes)
    blogservice
      .like({
        ...blog,
        likes: likes
      })
      .then(res => setlikes(res.likes))
  }

  if (!showFull) { 
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setShowFull(true)}>show</button>
        </p>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <button onClick={() => setShowFull(false)}>hide</button>
      <p>{blog.title} {blog.author}</p>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>likes {likes} <button onClick={() => handleLike(blog)}>like</button></p>
      <p>{blog.user.name}</p>
      {user.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
    </div>
  )
}

export default Blog