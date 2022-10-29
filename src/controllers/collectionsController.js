let fs = require('fs')
const filePath = "./data/collections.json"
let collections = JSON.parse(fs.readFileSync(filePath, 'utf8'))

exports.get = (req, res, next) => { 
    res.status(200).send(collections)
}

exports.getById = (req, res, next) => {
    res.status(200).send(collections.filter(user => user.id == req.params.id))
}

exports.post = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.name != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (collections.filter(collection => collection.id == body.id) != 0){
        res.status(400).send('Id already exists')
    } else {
        var id = collections[collections.length - 1].id + 1
        var collection = collections[collections.length - 1]
        collection.id = id
        collection.name = req.body.name
        collection.playlists = req.body.playlists
        collections.push(collection)
        fs.writeFileSync(filePath, JSON.stringify(collections, null, 2))
        res.status(201).send("Collection registered successfully")
    }
}

exports.put = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.name != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (collections.filter(collection => collection.id == req.params.id) == 0){
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < collections.length; i++) {
            if (collections[i].id == req.params.id) {
                collections[i].name = req.body.name
                collections[i].playlists = req.body.playlists
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(collections, null, 2))
        res.status(201).send("Collection altered successfully")
    }
}

exports.delete = (req, res, next) => {
    if (collections.filter(collection => collection.id == req.params.id) == 0){
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < collections.length; i++) {
            if (collections[i].id == req.params.id) {
                collections.splice(i, 1)
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(collections, null, 2))
        res.status(201).send("Collection removed successfully")
    }
}