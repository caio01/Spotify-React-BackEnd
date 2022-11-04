const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    datebirth: String,
    gender: String,
    playlists: String
})

module.exports = User