import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> ', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#blog-title')
  const author = container.querySelector('#blog-author')
  const url = container.querySelector('#blog-url')
  const createButton = screen.getByText('Create')

  await user.type(title, 'new blog')
  await user.type(author, 'new author')
  await user.type(url, 'www.newurl.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('new blog')
  expect(createBlog.mock.calls[0][0].author).toBe('new author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.newurl.com')
})
