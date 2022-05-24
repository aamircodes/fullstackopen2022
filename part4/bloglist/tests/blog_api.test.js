const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')

const helper = require('./helper.test')

const api = supertest(app)

beforeEach(async () => {
  await blog.deleteMany({})
  await blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(2)
})

test('blogs identification field is id and not _id', async () => {
  const singleBlog = await helper.blogsInDb()

  expect(singleBlog[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test an app',
    author: 'John Doe',
    url: 'https://fullstackopen.com/',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((t) => t.title)
  expect(titles).toContain('Test an app')
})

test('if likes is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Test an app',
    author: 'John Doe',
    url: 'https://fullstackopen.com/',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('a blog without title and url field are not added', async () => {
  const newBlog = {
    author: 'Harry Smith',
    likes: 2,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('succeeds with status code 204 if id is invalid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map((b) => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('blog updates', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    title: 'The best blog',
    author: 'Best person',
    url: 'bbbb.com',
    likes: 1000,
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  const updatedBlog = blogsAtEnd[0]

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  expect(updatedBlog.likes).toBe(1000)
  expect(updatedBlog.author).toBe('Best person')
})

afterAll(() => {
  mongoose.connection.close()
})
