const mongoose = require('mongoose')

const Playlist = mongoose.model('Playlist', {
    name: String,
    desc: String,
    cover: String,
    musics: String,
    collections: String,
    users: String
})

module.exports = Playlist