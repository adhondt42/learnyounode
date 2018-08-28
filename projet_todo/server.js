let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.listen(8080)