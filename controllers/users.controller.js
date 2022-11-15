const User = require('../models/User.model')
const Medicament = require('../models/Medicament.model')

module.exports.usersController = {

    // ДОБАВЛЕНИЕ КЛИЕНТА
    addUser: async (req, res) => {
        const user = await User.create({
            name: req.body.name,
            cash: req.body.cash,
        })
        res.json(user)
    },
    //ПОЛУЧЕНИЕ ВСЕХ КЛИЕНТОВ
    getUsers: async (req, res) => {
        const users = await User.find()
        res.json(users)
    },
    //ПОЛУЧЕНИЕ КЛИЕНТА ПО ИДЕНТИФИКАТОРУ
    getUserById: async (req, res) => {
        const user = await User.findById(req.params.id)
        res.json(user)
    },
    //УДАЛЕНИЕ КЛИЕНТА
    deleteUser: async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        res.json("User deleted success")
    },
    //ИЗМЕНЕНИЕ КЛИЕНТА В ОБЩЕМ (ВОЗМОЖНО И НЕ НУЖНО)
    updateUser: async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            cash: req.body.cash,
        }, { new: true })
        res.json(user)
    },
    //ПОПОЛНЕНИЕ СЧЕТА 
    addCash: async (req, res) => {
        try {
            const user = await User.findById(req.params.cashId)
            let newCash = user.cash + req.body.cash
            await User.findByIdAndUpdate(req.params.cashId, {
                $set: {
                    cash: newCash
                }
            }, { new: true })
            res.json(`Cash ${req.body.cash} added`)
        } catch (error) {
            res.json(error)
        }
    },
    //ДОБАВЛЕНИЕ ЛЕКАРСТВА В КОРЗИНУ
    addMedicsInBascket: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId)
            const medicaments = await Medicament.findById(req.body.medicament)
            if (!medicaments.saleWithoutRecipe) {
                return res.json("Данное лекарство не продается без рецепта")
            }
            await User.findByIdAndUpdate(req.params.id, {
                $addToSet: { medicaments: medicaments }
            }, { new: true })
            // let defaultTotal = await user.bascket.totalPrice
            let endTotal = await medicaments.reduce((acc, med) => {
                acc += med.price
            }, 0)
            // defaultTotal = endTotal
            user.bascket.totalPrice = endTotal
            // ПОЧЕМУ НЕЛЬЗЯ СТАВИТЬ await ПЕРЕД ПЕРЕЗАПИСЫВАНИЕМ
            res.json("Лекарство добавлено в корзину")
        } catch (error) {
            res.json(error.message)
        }
    }
}