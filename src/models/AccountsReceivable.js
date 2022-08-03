const mongoose = require('mongoose')

const AccontsReceivable = mongoose.model('AccontsReceivable',{
    customer_id: String,
    description: String,
    account_value: Number,
    account_paid_value: Number,
    account_rate_value: Number,
    account_date: Date,
    account_pay_date: Date,
    account_paid_off_date: Date,    
})

module.exports = AccontsReceivable