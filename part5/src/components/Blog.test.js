import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog renders', () => {
  let container
  const addLike = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'my title',
      author: 'john doe',
      url: 'www.test.com',
      likes: 1,
    }

    container = render(<Blog blog={blog} addLike={addLike} />).container
  })

  test('render title and author', () => {
    screen.findAllByText('my title')
    screen.findAllByText('john doe')
  })

  test('does not render url or likes by default', () => {
    const div = container.querySelector('.blog-details')
    expect(div).toHaveStyle('display: none')
  })

  test('blog url and lies shown when button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
  })

  test('blog event handler called twice after clicking like twice', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
