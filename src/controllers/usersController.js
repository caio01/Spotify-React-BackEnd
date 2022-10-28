let fs = require('fs')
const filePath = "./data/users.json"
let users = JSON.parse(fs.readFileSync(filePath, 'utf8'))


exports.get = (req, res, next) => { 
    res.status(200).send(users)
}

exports.getById = (req, res, next) => {
    res.status(200).send(users.filter(user => user.id == req.params.id))
}

exports.post = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.name != "string" || typeof body.email != "string" ||
        typeof body.password != "string" || typeof body.dateBirth != "string" ||
        typeof body.gender != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (users.filter(user => user.id == body.id) != 0){
        res.status(400).send('Id already exists')
    } else {
        var id = users[users.length - 1].id + 1
        var user = users[users.length - 1]
        user.id = id
        user.name = req.body.name
        user.email = req.body.email
        user.password = req.body.password
        user.dateBirth = req.body.dateBirth
        user.gender = req.body.gender
        user.playlists = req.body.playlists
        users.push(user)
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
        res.status(201).send("User registered successfully")
    }
}

exports.put = (req, res, next) => {
    const body = req.body
    if( body.id != undefined || typeof body.name != "string" || typeof body.email != "string" ||
        typeof body.password != "string" || typeof body.dateBirth != "string" ||
        typeof body.gender != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (users.filter(user => user.id == req.params.id) == 0){
        res.status(400).send('Id not exists')
    } else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users[i].name = req.body.name
                users[i].email = req.body.email
                users[i].password = req.body.password
                users[i].dateBirth = req.body.dateBirth
                users[i].gender = req.body.gender
                users[i].playlists = req.body.playlists
                break
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
        res.status(201).send("User altered successfully")
    }
}

exports.delete = (req, res, next) => {
    let id = req.params.id
    res.status(200).send(`Requisição recebida com sucesso! DELETE id:${id}`)
}