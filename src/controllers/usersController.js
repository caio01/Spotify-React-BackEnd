var CryptoJS = require("crypto-js")
const User = require('./../../models/User')

exports.get = async (req, res) => { 
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({ERROR: error.message})
    }
}

exports.getById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if(user === null) {
            res.status(422).send("Id is invalid")
            return
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).json({ERROR: error.message})
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
        res.status(500).json({ERROR: error.message})
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

    if( typeof name != "string" || typeof email != "string" || typeof password != "string" || typeof gender != "string" ) {
        res.status(422).send('Required is invalid')
        return
    }

    try {
        const updatedUser = await User.updateOne({ _id: req.params.id }, user)
        if(updatedUser.n === 0) {
            res.status(422).send('Id is invalid')
            return
        }
        res.status(201).send("User updated successfully")
    } catch (error) {
        res.status(500).json({ERROR: error.message})
    }
}

exports.delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(201).send("User deleted successfully")
    } catch (error) {
        res.status(500).json({ERROR: error.message})
    }
}

exports.login = async (req, res) => {
    try {
        var {email, password} = req.body
        password = decrypt(password)
        const user = await User.findOne({ email: email })

        if(user === null) {
            res.status(422).send("Id is invalid")
            return
        }
        
        if(user.email == email && decrypt(user.password) == password) {
            res.status(200).send(user)
        } else {
            res.status(400).send("Incorrect password")
        }
    } catch (error) {
        res.status(500).json({ERROR: error.message})
    }
}




// Encrypt
function encrypt(data) {
    var ciphertext = CryptoJS.AES.encrypt(data, 'my-secret-key@123').toString()
    return ciphertext
}
// Decrypt
function decrypt(data) {
    var bytes = CryptoJS.AES.decrypt(data, 'my-secret-key@123')
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
}