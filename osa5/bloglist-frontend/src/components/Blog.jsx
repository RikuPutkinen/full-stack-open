import { useState } from "react"

const Blog = ({ blog }) => {
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
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  )
}

export default Blog