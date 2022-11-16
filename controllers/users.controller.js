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
            const drug = await Medicament.findById(req.body.drug)
            if (!drug.saleWithoutRecipe) {
                return res.json("ДАННОЕ ЛЕКАРСТВО НЕ ПРОДАЕТСЯ БЕЗ РЕЦЕПТА")
            }
            let summ = user.totalPrice + drug.price
            await User.findByIdAndUpdate(req.params.userId, {
                $addToSet: { bascket: drug },
                $set: { totalPrice: summ }
            })
            await res.json("ЛЕАКАРСТВО ДОБАВЛЕНО В КОРЗИНУ")
        } catch (error) {
            res.json(error)
        }
    },
    //УДАЛЕНИЕ ЛЕКАРСТВА ИЗ КОРЗИНЫ
    deleteMedicsInBascket: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).populate('bascket')
            const drug = await Medicament.findById(req.body.drug)
            let summ1 = user.totalPrice - drug.price
            console.log(summ1)
            await User.findByIdAndUpdate(req.params.userId, {
                $pull: { bascket: req.body.drug },
                $set: { totalPrice: summ1 }
            }, { new: true })
            res.json("ЛЕКАРСТВО УДАЛЕНО ИЗ КОРЗИНЫ")
        } catch (error) {
            res.json(error)
        }
    },
    //ОЧИЩЕНИЕ КОРЗИНЫ
    clearBascket: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.userId, {
                $pull: { bascket: req.body.drug },
                $set: { totalPrice: 0 }
            }, { new: true })
            res.json("ВАША КОРЗИНА ПУСТА")
        } catch (error) {
            res.json(error)
        }
    },
    //ПОКУПАТЬ ЛЕКАРСТВА ИЗ КОРЗИНЫ
    bayDrugsFromBascket: async (req, res) => {
        const user = await User.findById(req.params.userId)
        // const drug = await Medicament.findById(req.body.drug)
        if (user.cash < user.totalPrice) {
            return res.json("НА ВАШЕМ СЧЕТЕ НЕДОСТАТОЧНО СРЕДСТВ")
        }
        let outputCash = user.cash - user.totalPrice
        await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                cash: outputCash,
                totalPrice: 0,
                bascket: []
            }
        }, { new: true })
        await res.json(`ЛЕКАРСТВА ПРИОБРЕТЕНЫ! НА ВАШЕМ СЧЕТЕ ОСТАЛОСЬ ${outputCash} РУБЛЕЙ`)
    }


}