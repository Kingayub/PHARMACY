const Medicaments = require('../models/Medicament.model')

module.exports.medicamentsController = {
    //ДОБАВЛЕНИЕ ЛЕКАРСТВА
    addMedicaments: async (req, res) => {
        const medics = await Medicaments.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            saleWithoutRecipe: req.body.saleWithoutRecipe,
            categoryName: req.body.categoryName
        })
        res.json(medics)
    },
    //УДАЛЕНИЕ ЛЕКАРСТВА
    deleteMedicaments: async (req, res) => {
        await Medicaments.findByIdAndDelete(req.params.id)
        res.json("Medicaments deleted success")
    },
    //ИЗМЕНЕНИЕ ЛЕКАРСТВА
    updateMedicaments: async (req, res) => {
        const medics = await Medicaments.findByIdAndUpdate({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            saleWithoutRecipe: req.body.saleWithoutRecipe,
            categoryName: req.body.categoryName
        })
        res.json(medics)
    },
    //ПОЛУЧЕНИЕ ВСЕХ ЛЕКАРСТВ
    getAllMedicaments: async (req,res)=> {
        const medics = await Medicaments.find()
        res.json(medics)
    },
    //ПОЛУЧЕНИЕ КОНКРЕТНОГО ЛЕКАРСТВА ПО ИДЕНТИФИКАТОРУ
    getMedicamentById: async(req,res)=> {
        const medics = await Medicaments.findById(req.params.id)
        res.json(medics)
    }
}