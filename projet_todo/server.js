let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')


//Template engine 
app.set('view engine', 'ejs')

// middlewares
app.use(express.static('public')) // dossier contient les statics
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
	secret: 'beer',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
  }))


// get

app.get('/', (req, res) => {
    let Task = require('./models/task') // require mon propre class et ses modules 
    Task.all(function(task) {
    res.render('pages/index', {task}) // retourne le template
    })
})

// post

app.post('/add', (req, res) => {
    //newtask correspond au champ html "name=newtask"
	if (req.body.newtask === undefined || req.body.newtask === '') {
        res.redirect('/')
    }
	else {
		let Task = require('./models/task')
		Task.create(req.body.newtask, function () {
        res.redirect('/')
	})
	}
})

app.get('/delete/:id', (req, res) => {
  let Task = require('./models/task')
 Task.delete(req.params.id)
 res.redirect('/')
})


app.listen(8080)