const { Router } = require('express')
const route = Router()
const usersRoute = require('./users.route')
const medicamentsRoute = require('./medicaments.route')

route.use(usersRoute)
route.use(medicamentsRoute)


module.exports = route