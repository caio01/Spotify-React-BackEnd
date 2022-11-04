const Collection = require('./../../models/Collection')

exports.get = async (req, res) => { 
    try {
        const collections = await Collection.find()
        res.status(200).send(collections)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.getById = async (req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id })
        if(collection === null) {
            res.status(422).send("Id is invalid")
            return
        }
        res.status(200).send(collection)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.post = async (req, res) => {
    const {name, playlists} = req.body
    const collection = {
        name,
        playlists
    }

    if( typeof name != "string" || typeof playlists != "string") {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await Collection.create(collection)
        res.status(201).send("Collection registered successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.put = async (req, res) => {
    const {name, playlists} = req.body
    const collection = {
        name,
        playlists
    }

    try {
        const updatedCollection = await Collection.findOne({ _id: req.params.id})
        if(updatedCollection.n === 0) {
            res.status(422).send('Id is invalid')
            return
        }
    } catch (error) {
        res.status(422).send('Id is invalid')
    }
    
    if ( typeof name != "string" || typeof playlists != "string") {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await Collection.updateOne({ _id: req.params.id }, collection)
        res.status(201).send("Collection updated successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.delete = async (req, res) => {
    try {
        await Collection.deleteOne({ _id: req.params.id })
        res.status(201).send("Collection deleted successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}