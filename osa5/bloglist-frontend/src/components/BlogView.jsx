import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import BlogCommentForm from './BlogCommentForm'
import { Button, ListGroup } from 'react-bootstrap'

export default function BlogView({ blog }) {
  const queryClient = useQueryClient()
  const likeBlogMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  function handleLike(blog) {
    likeBlogMutation.mutate(blog)
  }
  return (
    <>
      <h3>
        {blog.title} {blog.author}
      </h3>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <Button onClick={() => handleLike(blog)}>like</Button>
      </p>
      <p>Added by {blog.user.username}</p>

      <h4>comments</h4>
      <BlogCommentForm blog={blog} />
      <ListGroup>
        {blog.comments.map(comment => {
          return <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        })}
      </ListGroup>
    </>
  )
}
