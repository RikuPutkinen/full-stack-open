import { useState, useContext } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

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

      <Table striped>
        <thead>
          <tr>
            <td>title</td>
            <td>author</td>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
    </>
  )
}
