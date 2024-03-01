import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import BlogCommentForm from './BlogCommentForm'

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
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>Added by {blog.user.username}</p>

      <h3>comments</h3>
      <BlogCommentForm blog={blog} />
      <ul>
        {blog.comments.map(comment => {
          return <li key={comment}>{comment}</li>
        })}
      </ul>
    </>
  )
}
