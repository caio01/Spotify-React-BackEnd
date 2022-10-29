const express = require('express')
const app = express()

//Rotas
const index = require('./routes/index')
const usersRoute = require('./routes/usersRoute')
const collectionsRoute = require('./routes/collectionsRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)
app.use('/users', usersRoute)
app.use('/collections', collectionsRoute)

module.exports = app;