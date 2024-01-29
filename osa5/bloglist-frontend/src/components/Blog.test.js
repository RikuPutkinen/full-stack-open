import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url of likes by default', () => {
  const blog = {
    title: 'A',
    author: 'B',
    url: 'C',
    likes: 1,
    user: {
      username: 'D'
    }
  }

  const user = {
    username: 'D',
    name: 'E'
  }

  render(<Blog blog={blog} user={user}/>)

  const titleAndAuthor = screen.getByText('A B')
  const urlRow = screen.queryByText('C')
  const likesRow = screen.queryByText('likes 1')

  expect(titleAndAuthor).toBeDefined()
  expect(urlRow).not.toBeInTheDocument()
  expect(likesRow).not.toBeInTheDocument()
})