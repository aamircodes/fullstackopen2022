import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import loginService from './services/login'

import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <form onSubmit={handleAddBlog}>
        <h2>Creat new</h2>
        <div>
          Title:
          <input type='text' value={title} name='title' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          Author:
          <input type='text' value={author} name='author' onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Url:
          <input type='text' value={url} name='url' onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>
    )
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    alert('added new blog')
    console.log(title, author, url)

    const newBlogObj = {
      title,
      author,
      url,
    }
    const res = await blogService.create(newBlogObj)
    setBlogs([...blogs, res])
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
