import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <li style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
