const mongoose = require('mongoose')

const CategoryMedicamentSchema = mongoose.Schema({
    name: String, 
})

const CategoryMedicament = mongoose.model('CategoryMedicament', CategoryMedicamentSchema)

module.exports = CategoryMedicament