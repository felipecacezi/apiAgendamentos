const express  = require('express')
const app      = express()
require('dotenv').config()

const UserRoutes = require('../routes/UserRoutes')

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.use('/user', UserRoutes)

module.exports = app;