const Playlist = require('./../../models/Playlist')

exports.get = async (req, res) => { 
    try {
        const playlists = await Playlist.find()
        res.status(200).send(playlists)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.getById = async (req, res) => {
    try {
        const playlist = await Playlist.findOne({ _id: req.params.id })
        if(playlist === null) {
            res.status(422).send("Id is invalid")
            return
        }
        res.status(200).send(playlist)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.post = async (req, res) => {
    const {name, desc, cover, musics, collections, users} = req.body
    const playlist = {
        name,
        desc,
        cover,
        musics,
        collections,
        users
    }

    if( typeof name != "string" || typeof desc != "string" || typeof cover != "string") {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await Playlist.create(playlist)
        res.status(201).send("Playlist registered successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.put = async (req, res) => {
    const {name, desc, cover, musics, collections, users} = req.body
    const playlist = {
        name,
        desc,
        cover,
        musics,
        collections,
        users
    }

    try {
        const updatedPlaylist = await Playlist.findOne({ _id: req.params.id})
        if(updatedPlaylist.n === 0) {
            res.status(422).send('Id is invalid')
            return
        }
    } catch (error) {
        res.status(422).send('Id is invalid')
    }
    
    if( typeof name != "string" || typeof desc != "string" || typeof cover != "string") {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await Playlist.updateOne({ _id: req.params.id }, playlist)
        res.status(201).send("Playlist updated successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.delete = async (req, res) => {
    try {
        await Playlist.deleteOne({ _id: req.params.id })
        res.status(201).send("Playlist deleted successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}