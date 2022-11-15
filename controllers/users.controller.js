const User = require('../models/User.model')
const Medicament = require('../models/Medicament.model')
const { populate } = require('../models/User.model')
const { path } = require('express/lib/application')

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
            await User.findByIdAndUpdate(req.params.userId, {
                $addToSet: { bascket: drug }
            }, { new: true }).populate('bascket')

            // const a = await User.findByIdAndUpdate(req.params.userId, {
            //     $set: {
            //         totalPrice: bascket.reduce((acc, item) => {
            //             return acc + item.price
            //         })
            //     }
            // }, { new: true }
            // )
            // console.log(a)

            user.totalPrice = await user.bascket.reduce((acc, item) => {
                acc + item.price
            }, 0)
            console.log(user.totalPrice)
            // user.totalPrice = endTotal
            // ПОЧЕМУ НЕЛЬЗЯ СТАВИТЬ await ПЕРЕД ПЕРЕЗАПИСЫВАНИЕМ
            await res.json("ЛЕКАРСТВО ДОБАВЛЕНО В КОРЗИНУ")
        } catch (error) {
            res.json(error)
        }
    },
    //УДАЛЕНИЕ ЛЕКАРСТВА ИЗ КОРЗИНЫ
    deleteMedicsInBascket: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId)
            const drug = await Medicament.findById(req.body.drug)
            await User.findByIdAndUpdate(req.params.id, {
                $pull: { medicaments: drug }
            }, { new: true }).populate({ path: "bascket.medicaments" })
            // let defaultTotal = await user.bascket.totalPrice
            let endTotal = await user.bascket.medicaments.reduce((acc, med) => {
                acc += med.price
            }, 0)
            // defaultTotal = endTotal
            user.bascket.totalPrice = endTotal
            // ПОЧЕМУ НЕЛЬЗЯ СТАВИТЬ await ПЕРЕД ПЕРЕЗАПИСЫВАНИЕМ
            res.json("Лекарство удалено из корзины")
        } catch (error) {
            res.json(error)
        }
    },
    //ОЧИЩЕНИЕ КОРЗИНЫ
    clearBascket: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, {
                $set: { medicaments: [] }
            }, { new: true })
            res.json("ВАША КОРЗИНА ПУСТА")
        } catch (error) {
            res.json(error)
        }
    },
    //ПОКУПАТЬ ЛЕКАРСТВА ИЗ КОРЗИНЫ
    bayDrugsFromBascket: async (req, res) => {
        const user = await User.findById(req.params.userId)
        const drug = await Medicament.findById(req.body.drug)
        //НУЖНО УБРАТЬ ИЗ КОРЗИНЫ КУПЛЕННЫЙ ТОВАР
        //МИНУСОВАТЬ СУММУ КУПЛЕННОГО ТОВАРА ИЗ ОБЩЕЙ СУММЫ ЮЗЕРА
        //ВЕРНУТЬ ТОВАР УСПЕШНО ОТПРАВЛЕН ВАМ ПО ПОЧТЕ
    }


}