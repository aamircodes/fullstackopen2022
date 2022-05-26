const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const users = await User.find({})
  const body = request.body

  const usernamesArray = users.map((user) => user.username)
  if (usernamesArray.includes(body.username)) {
    return response.status(400).json({ error: 'username should be unique' })
  }

  if (body.username === undefined) {
    return response.status(400).json({ error: 'username missing' })
  }

  if (body.password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  }

  if (body.username.length < 3) {
    return response.status(403).json({ error: 'username less than 3 characters' })
  }

  if (body.password.length < 3) {
    return response.status(403).json({ error: 'password less than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
