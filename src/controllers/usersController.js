const User = require('./../../models/User')

exports.get = async (req, res) => { 
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.getById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).send(user)
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.post = async (req, res) => {
    const {name, email, password, datebirth, gender, playlists} = req.body
    const user = {
        name,
        email,
        password,
        datebirth,
        gender,
        playlists
    }

    if( typeof name != "string" || typeof email != "string" || typeof password != "string" || typeof gender != "string" ) {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await User.create(user)
        res.status(201).send("User registered successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.put = async (req, res) => {
    const {name, email, password, datebirth, gender, playlists} = req.body
    const user = {
        name,
        email,
        password,
        datebirth,
        gender,
        playlists
    }

    try {
        await User.findOne({ _id: req.params.id})
    } catch (error) {
        res.status(422).send('Id is invalid')
    }

    if( typeof name != "string" || typeof email != "string" || typeof password != "string" || typeof gender != "string" ) {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        await User.updateOne({ _id: req.params.id }, user)
        res.status(201).send("User updated successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}

exports.delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(201).send("User deleted successfully")
    } catch (error) {
        res.status(500).json({ERROR: error})
    }
}