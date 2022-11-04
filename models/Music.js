const mongoose = require('mongoose')

const Music = mongoose.model('Music', {
    musicname: String,
    author: String,
    album: String,
    src: String,
    playlists: String
})

module.exports = Music