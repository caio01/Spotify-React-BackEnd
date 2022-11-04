const app = require('../src/app')
const mongoose = require('mongoose')

const port = normalizaPort(process.env.PORT || '3333');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const DB_USER = 'userAdminDB'
const DB_PASS = '95zmOJYYfzSL7fs8'

mongoose
    .connect( `mongodb+srv://${DB_USER}:${DB_PASS}@spotify-db.cy5jid9.mongodb.net/?retryWrites=true&w=majority` , 
            { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado ao MongoDB!")
        app.listen(port, function () {
            console.log(`app listening on port ${port}`)
        })
    })
    .catch((err) => console.log(err))