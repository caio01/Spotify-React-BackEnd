let fs = require('fs')
const filePath = "./data/musics.json"
let musics = JSON.parse(fs.readFileSync(filePath, 'utf8'))


exports.get = (req, res, next) => {
    try {
        res.status(200).send(musics.filter(m => 
            m.musicname.toLowerCase().includes(req.query.search.toLowerCase())||
            m.author.toLowerCase().includes(req.query.search.toLowerCase())||
            m.album.toLowerCase().includes(req.query.search.toLowerCase())
            ))
    } catch {
        res.status(200).send(musics)
    }
}

exports.getById = (req, res, next) => {
    res.status(200).send(musics.filter(music => music.id == req.params.id))
}

exports.post = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.musicname != "string" || typeof body.author != "string" ||
        typeof body.album != "string" || typeof body.src != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (musics.filter(music => music.id == body.id) != 0) {
        res.status(400).send('Id already exists')
    } else {
        var id = musics[musics.length - 1].id + 1
        musics.push({
            id : id,
            musicname : req.body.musicname,
            author : req.body.author,
            album : req.body.album,
            src : req.body.src,
            playlists : req.body.playlists
        })
        fs.writeFileSync(filePath, JSON.stringify(musics, null, 2))
        res.status(201).send("Music registered successfully")
    }
}

exports.put = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.musicname != "string" || typeof body.author != "string" ||
        typeof body.album != "string" || typeof body.src != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (musics.filter(music => music.id == body.id) != 0) {
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < musics.length; i++) {
            if (musics[i].id == req.params.id) {
                musics[i].musicname = req.body.musicname
                musics[i].author = req.body.author
                musics[i].album = req.body.album
                musics[i].src = req.body.src
                musics[i].playlists = req.body.playlists
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(musics, null, 2))
        res.status(201).send("Music altered successfully")
    }
}

exports.delete = (req, res, next) => {
    if (musics.filter(music => music.id == req.params.id) == 0){
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < musics.length; i++) {
            if (musics[i].id == req.params.id) {
                musics.splice(i, 1)
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(musics, null, 2))
        res.status(201).send("Music removed successfully")
    }
}