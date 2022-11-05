const Music = require('./../../models/Music')

exports.get = async (req, res) => { 
    try {
        const musics = await Music.find()
        if (req.query.search == undefined) {
            res.status(200).send(musics)    
        } else {
            res.status(200).send(musics.filter(m => 
                m.musicname.toLowerCase().includes(req.query.search.toLowerCase())||
                m.author.toLowerCase().includes(req.query.search.toLowerCase())||
                m.album.toLowerCase().includes(req.query.search.toLowerCase())
                ))
        }
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.getById = async (req, res) => {
    try {
        const music = await Music.findOne({ _id: req.params.id })
        if(music === null) {
            res.status(422).send("Id is invalid")
            return
        }
        res.status(200).send(music)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.post = async (req, res) => {
    const {musicname, author, album, src, playlists} = req.body
    const music = {
        musicname,
        author,
        album,
        src,
        playlists
    }

    if( typeof musicname != "string" || typeof author != "string" || typeof album != "string" || typeof src != "string") {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await Music.create(music)
        res.status(201).send("Music registered successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.put = async (req, res) => {
    const {musicname, author, album, src, playlists} = req.body
    const music = {
        musicname,
        author,
        album,
        src,
        playlists
    }

    try {
        const updatedMusic = await Music.findOne({ _id: req.params.id})
        if(updatedMusic.n === 0) {
            res.status(422).send('Id is invalid')
            return
        }
    } catch (error) {
        res.status(422).send('Id is invalid')
    }
    
    if( typeof musicname != "string" || typeof author != "string" || typeof album != "string" || typeof src != "string") {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await Music.updateOne({ _id: req.params.id }, music)
        res.status(201).send("Music updated successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.delete = async (req, res) => {
    try {
        await Music.deleteOne({ _id: req.params.id })
        res.status(201).send("Music deleted successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}