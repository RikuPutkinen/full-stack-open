import { useState, useContext } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import UserContext from '../contexts/UserContext'

export default function BlogList({ blogs }) {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  return (
    <>
      <Togglable
        visible={blogFormVisible}
        buttonLabel={'new blog'}
        handleHide={() => setBlogFormVisible(false)}
        handleShow={() => setBlogFormVisible(true)}
      >
        <BlogForm />
      </Togglable>
      <ul>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}
