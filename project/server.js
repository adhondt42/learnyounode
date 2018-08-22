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

// Route
app.get('/', (req, res) => {
	res.render('pages/index')
})

app.post('/' , (req, res) => {
	if (req.body.message === undefined || req.body.message === '') {
		res.redirect('/')
	}
	else
		res.redirect("http://google.com")
	console.log("Someone on '/'")

})


app.listen(8000)