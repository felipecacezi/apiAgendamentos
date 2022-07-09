const express  = require('express')
const mongoose = require('mongoose')
const app      = express()
require('dotenv').config()
const CON_STRING = process.env.MONGO_CON_STRING
const PORT = process.env.PORT
const HOST = process.env.HOST

const UserRoutes = require('./routes/UserRoutes')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())
app.use('/user', UserRoutes)


mongoose.connect(`${CON_STRING}`)
.then(()=>{
    console.log(`Server running in ${PORT} port`)
    app.listen(PORT, HOST)
})
.catch((err)=>console.log(err))