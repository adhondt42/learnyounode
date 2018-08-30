let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')


// Template engine
app.set('view engine', 'ejs')


// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
	secret: 'beer',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
  }))
app.use(require('./middlewares/flash'))



// Route
app.get('/', (req, res) => {
	let Message = require('./models/message')
	Message.all(function (messages) {
	res.render('pages/index', {message: messages})
	})
})


// Activités

app.post('/' , (req, res) => {
	if (req.body.message === undefined || req.body.message === '') {
        req.flash('error', 'Mais de quelle Dhondterie parle-t-on ?')
        res.redirect('/')
    }
	else {
		let Message = require('./models/message')
		Message.create(req.body.message, function () {
		req.flash('success', "Dhondterie enregistrée avec succès !")
        res.redirect('/')
	})
	}

})


app.listen(8080)
