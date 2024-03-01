import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

import blogService from '../services/blogs'

export default function BlogCommentForm({ blog }) {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const newCommentMutation = useMutation({
    mutationFn: async ({ blogToUpdate, comment }) => {
      await blogService.createComment(blogToUpdate, comment)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: e => console.log(e),
  })

  function handleSubmit(e) {
    e.preventDefault()
    newCommentMutation.mutate({ blogToUpdate: blog, comment })
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit} className="horizontal">
      <Form.Control
        type="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Button type="submit">add comment</Button>
    </Form>
  )
}
