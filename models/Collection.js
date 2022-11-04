const mongoose = require('mongoose')

const Collection = mongoose.model('Collection', {
    name: String,
    playlists: String,
})

module.exports = Collection