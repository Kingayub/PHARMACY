const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    cash: Number,
    totalPrice: {
        type:Number,
        default: 0
    },
    bascket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicament'
    }],
})

const User = mongoose.model('User', UserSchema)

module.exports = User