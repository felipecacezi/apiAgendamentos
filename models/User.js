const mongoose = require('mongoose')

// cria a entidade no mongo
const User = mongoose.model('User',{
    name: String,
    email: String,
    password: String,
    phone: String,
    type: Number,
})

module.exports = User