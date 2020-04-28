const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const users = require('../../Users')

//Returns all users
router.get('/', (req, res) => {
  res.json(users)
})

//Return a single user specified by the user id.
router.get('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))
  if(found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}.` })
  }
})

//Create a user
router.post('/', (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: 'Please include a name and an email.' })
  }

  users.push(newUser)
  res.json(users)
})

//Update user
router.put('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))
  if(found) {
    const updUser = req.body
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)){
        user.name = updUser.name ? updUser.name : user.name
        user.email = updUser.email ? updUser.email : user.email

        res.json({ msg: 'User updated.', user })
      }
    })
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}.` })
  }
})

module.exports = router
