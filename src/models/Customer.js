const mongoose = require('mongoose')

const Customer = mongoose.model('Customer',{
    user_id: String,
    name: String,
    rg: String,
    cpf: String,
    zipCode: String,
    street: String,
    district: String,
    city: String,
    state: String,
    number: Number,
    phone_number: String    
})

module.exports = Customer