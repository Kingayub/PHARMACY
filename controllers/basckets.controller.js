const Bascket = require('../models/Bascket.model')
const User = require('../models/User.model')
const Medicaments = require('../models/Medicament.model')

module.exports.bascketsController = {
    //ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
    addMedicsInBascket: async (req, res) => {
        const user = await User.findById(req.body.user)
        const medicaments = await Medicaments.findById(req.body.medicament)

        if (!medicaments.saleWithoutRecipe) {
            return res.json("Данное лекарство не продается без рецепта")
        }
        await Bascket.findByIdAndUpdate(req.params.id, {
            user: user
        })
        await Bascket.findByIdAndUpdate(req.params.id, {
            $addToSet: {medicaments: medicaments}
        })
        let total = await Bascket.totalPrice
        let total1 = await Medicaments.reduce((acc, med)=> {
            acc += med.price
        },0)
        total = total1
        
        // res.json(bascket)
    }
}