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
    if( typeof body.id != "number" || typeof body.name != "string" || typeof body.email != "string" ||
        typeof body.password != "string" || typeof body.dateBirth != "string" ||
        typeof body.gender != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (users.filter(user => user.id == body.id) != 0){
        res.status(400).send('Id already exists')
    } else {
        users.push(req.body)
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
        res.status(201).send("User registered successfully")
    }
}

exports.put = (req, res, next) => {
    const body = req.body
    if( typeof body.id != "number" || typeof body.name != "string" || typeof body.email != "string" ||
        typeof body.password != "string" || typeof body.dateBirth != "string" ||
        typeof body.gender != "string" || typeof body.playlists != "string")
    {
        res.status(400).send('Required is invalid')
    } else if (users.filter(user => user.id == req.params.id) == 0){
        res.status(400).send('Id not exists')
    } else {
        //users.filter(user => user.id == req.params.id) = req.body
        //console.log(req.params.id)
        //fs.writeFile(filePath, JSON.stringify(users), function () {})
        res.status(201).send("User altered successfully")
    }
}

exports.delete = (req, res, next) => {
    let id = req.params.id
    res.status(200).send(`Requisição recebida com sucesso! DELETE id:${id}`)
}