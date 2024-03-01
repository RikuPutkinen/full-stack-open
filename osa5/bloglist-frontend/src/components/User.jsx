import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default function User({ user }) {
  return (
    <>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog => {
          return <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        })}
      </ListGroup>
    </>
  )
}
