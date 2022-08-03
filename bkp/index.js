const mongoose = require('mongoose')
require('dotenv').config()
const CON_STRING = process.env.MONGO_CON_STRING
const PORT = process.env.PORT
const HOST = process.env.HOST

const app = require('./config/server')


mongoose.connect(`${CON_STRING}`)
.then(()=>{
    console.log(`Server running in ${PORT} port`)
    app.listen(PORT, HOST)
})
.catch((err)=>console.log(err))