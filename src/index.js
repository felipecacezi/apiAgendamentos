const app = require('./server')
const mongoose = require('mongoose')

require('dotenv').config()
const CON_STRING = process.env.MONGO_CON_STRING
const PORT = process.env.PORT
const HOST = process.env.HOST


mongoose.connect(`${CON_STRING}`)
    .then(()=>{
        app.listen(3000,()=>console.log("Server is running"))
    })
    .catch((err)=>console.log(err))

