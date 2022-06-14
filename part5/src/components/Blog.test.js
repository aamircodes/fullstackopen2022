import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog renders', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'my title',
      author: 'john doe',
      url: 'www.test.com',
      likes: 1,
    }

    container = render(<Blog blog={blog} />).container
  })

  test('render title and author', () => {
    screen.findAllByText('my title')
    screen.findAllByText('john doe')
  })

  test('does not render url or likes by default', () => {
    const div = container.querySelector('.blog-details')
    expect(div).toHaveStyle('display: none')
  })
})
