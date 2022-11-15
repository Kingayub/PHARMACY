const { Router } = require('express')
const { usersController } = require('../controllers/users.controller')
const route = Router()

route.get('/users', usersController.getUsers)
route.get('/users/:id', usersController.getUserById)
route.post('/users', usersController.addUser)
route.delete('/users/:id', usersController.deleteUser)
route.patch('/users/:id', usersController.updateUser)
route.patch('/users/cash/:cashId', usersController.addCash)
route.patch('/users/addbascket/:userId', usersController.addMedicsInBascket)
route.patch('/users/deletebascket/:userId', usersController.deleteMedicsInBascket)
route.patch('/users/clearbascket/:userId', usersController.clearBascket)
route.patch('/users/bayfrombascket/:userId', usersController.bayDrugsFromBascket)


module.exports = route
