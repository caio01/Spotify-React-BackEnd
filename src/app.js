const express = require('express')
const app = express()

//Rotas
const index = require('./routes/index')
const usersRoute = require('./routes/usersRoute')
const collectionsRoute = require('./routes/collectionsRoute')
const playlistsRoute = require('./routes/playlistsRoute')
const musicsRoute = require('./routes/musicsRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)
app.use('/users', usersRoute)
app.use('/collections', collectionsRoute)
app.use('/playlists', playlistsRoute)
app.use('/musics', musicsRoute)

module.exports = app;