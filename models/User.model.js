const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    cash: Number,
    bascket: {
        medicaments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicament'
        }],
        totalPrice: Number
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User