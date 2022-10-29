let fs = require('fs')
const filePath = "./data/playlists.json"
let playlists = JSON.parse(fs.readFileSync(filePath, 'utf8'))


exports.get = (req, res, next) => { 
    res.status(200).send(playlists)
}

exports.getById = (req, res, next) => {
    res.status(200).send(playlists.filter(playlist => playlist.id == req.params.id))
}

exports.post = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.name != "string" || typeof body.desc != "string" ||
        typeof body.cover != "string" || typeof body.musics != "string" ||
        typeof body.collections != "string" || typeof body.users != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (playlists.filter(playlist => playlist.id == body.id) != 0) {
        res.status(400).send('Id already exists')
    } else {
        var id = playlists[playlists.length - 1].id + 1
        playlists.push({
            id : id,
            name : req.body.name,
            desc : req.body.desc,
            cover : req.body.cover,
            musics : req.body.musics,
            collections : req.body.collections,
            users : req.body.users
        })
        fs.writeFileSync(filePath, JSON.stringify(playlists, null, 2))
        res.status(201).send("User registered successfully")
    }
}

exports.put = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.name != "string" || typeof body.desc != "string" ||
        typeof body.cover != "string" || typeof body.musics != "string" ||
        typeof body.collections != "string" || typeof body.users != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (playlists.filter(playlist => playlist.id == body.id) != 0) {
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < playlists.length; i++) {
            if (playlists[i].id == req.params.id) {
                playlists[i].name = req.body.name
                playlists[i].desc = req.body.desc
                playlists[i].cover = req.body.cover
                playlists[i].musics = req.body.musics
                playlists[i].collections = req.body.collections
                playlists[i].users = req.body.users
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(playlists, null, 2))
        res.status(201).send("Playlist altered successfully")
    }
}

exports.delete = (req, res, next) => {
    if (playlists.filter(playlist => playlist.id == req.params.id) == 0){
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < playlists.length; i++) {
            if (playlists[i].id == req.params.id) {
                playlists.splice(i, 1)
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(playlists, null, 2))
        res.status(201).send("Playlist removed successfully")
    }
}