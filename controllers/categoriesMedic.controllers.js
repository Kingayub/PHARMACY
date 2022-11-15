const CategoryMedicament = require('../models/CategoryMedic.model')

module.exports.CategoriesMedicamentController = {
    // ДОБАВЛЕНИЕ КАТЕГОРИИ ЛЕКАРСТВА
    addCategory: async (req, res) => {
        const category = await CategoryMedicament({
            name: req.body.name
        })
        res.json(category)
    },
    //ПОЛУЧЕНИЕ ВСЕХ КАТЕГОРИЙ ЛЕКАРСТВ
    getCategory: async (req, res) => {
        const category = await CategoryMedicament.find()
        res.json(category)
    },
    //ПОЛУЧЕНИЕ КАТЕГОРИИ ПО ИДЕНТИФИКАТОРУ
    getCategoryById: async (req, res) => {
        const category = await CategoryMedicament.findById(req.params.id)
        res.json(category)
    },
    //ИЗМЕНЕНИЕ КАТЕГОРИИ
    updateCategory: async (req, res) => {
        const category = await CategoryMedicament.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, { new: true })
        res.json(category)
    },
    //УДАЛЕНИЕ КАТЕГОРИИ
    deleteCategory: async (req, res) => {
        await CategoryMedicament.findByIdAndDelete(req.params.id)
        res.json("Category deleted success")
    }
}