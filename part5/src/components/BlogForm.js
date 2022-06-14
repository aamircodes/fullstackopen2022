import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input value={title} name='title' id='blog-title' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          Author:
          <input value={author} name='author' id='blog-author' onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Url:
          <input value={url} name='url' id='blog-url' onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
