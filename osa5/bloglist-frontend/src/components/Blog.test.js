import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'A',
    author: 'B',
    url: 'C',
    likes: 1,
    user: {
      username: 'D',
      name: 'E'
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

test('renders title, author, url, likes and user after "show" button is pressed', async () => {
  const blog = {
    title: 'A',
    author: 'B',
    url: 'C',
    likes: 1,
    user: {
      username: 'D',
      name: 'E'
    }
  }

  const user = {
    username: 'D',
    name: 'E'
  }

  render(<Blog blog={blog} user={user}/>)

  const button = screen.getByText('show')
  await userEvent.click(button)

  const titleAndAuthor = screen.getByText('A B')
  const urlRow = screen.getByText('C')
  const likesRow = screen.getByText('likes 1')
  const userRow = screen.getByText('E')
})