import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls callback with correct values when submitted', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.queryByLabelText('title:')
  const authorInput = screen.queryByLabelText('author:')
  const urlInput = screen.queryByLabelText('url:')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'A')
  await user.type(authorInput, 'B')
  await user.type(urlInput, 'C')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'A',
    author: 'B',
    url: 'C'
  })
})