const mongoose = require('mongoose')

const Schedule = mongoose.model('Schedule',{
    customer_id: String,    
    schedule_status: String, 
    date: { type: Date, default: Date.now },
    notes: String
})

module.exports = Schedule

/*
    schedule_status
    a:active, 
    f:finished, 
    c:canceled
*/