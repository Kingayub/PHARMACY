const mongoose = require('mongoose')

const MedicamentSchema = mongoose.Schema({
    name: String,
    description: String,
    price:Number,
    saleWithoutRecipe: Boolean,
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryMedicament'
    }
})

const Medicament = mongoose.model('Medicament', MedicamentSchema)

module.exports = Medicament