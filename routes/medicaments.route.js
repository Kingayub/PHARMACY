const { Router } = require('express')
const { medicamentsController } = require('../controllers/medicaments.controller')
const route = Router()

route.get('/medicaments', medicamentsController.getAllMedicaments)
route.get('/medicaments/:id', medicamentsController.getMedicamentById)
route.post('/medicaments', medicamentsController.addMedicaments)
route.patch('/medicaments/:id', medicamentsController.updateMedicaments)
route.delete('/medicaments/:id', medicamentsController.deleteMedicaments)

module.exports = route