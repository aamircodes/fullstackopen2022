import { useState } from 'react'

const Blog = ({ blog, addLike, addRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [toggleButtonText, setToggleButtonText] = useState('view')

  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
    setToggleButtonText(toggleButtonText === 'view' ? 'hide' : 'view')
  }

  const like = () => {
    addLike(blog)
  }

  const remove = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) && addRemove(blog.id)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{toggleButtonText}</button>
      </div>
      <div style={detailsStyle} className='blog-details'>
        {blog.url}
        <br />
        {blog.likes} <button onClick={like}>like</button>
        <br />
        {blog.author}
        <br />
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
