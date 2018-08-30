var express = require('express')
var app = express()
var server = require('http').Server(app);
var fs = require('fs');
var ent = require('ent')                                                        // evite injection de js ??

// Setting express/template
app.set('view engine', 'ejs')
app.use(express.static('public'))                                               // dossier contient les statics

app.get('/', (req, res) => {
    // res.sendFile('./views/index.ejs' , { root : __dirname});                 // __dirname = current directory
    res.render('index') // retourne le template
})

// Setting socket
var io = require('socket.io').listen(server)                                    // Chargement de socket.io
var user_list = []

// On new socket
io.sockets.on('connection', function (socket) {                                 // une socket par user 

    for (var k = 0; k < user_list.length; k++) {
        socket.emit('new_client', {pseudo: user_list[k], txt_area: 0})          
    }
    socket.on('new_client', (pseudo) => {
        pseudo = ent.encode(pseudo)
        socket.pseudo = pseudo
        io.sockets.emit('new_client', {pseudo: pseudo, txt_area: 1})            // Tous les user dont moi
        user_list.push(pseudo)
    })

    socket.on('message', (message) => {
        message = ent.encode(message)
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message}) // tous les usr sauf moi
    })

    socket.on('disconnect', () => {
        var index = user_list.indexOf(socket.pseudo);
        if (index > -1) {
          user_list.splice(index, 1);
        }
        io.sockets.emit('usr_disconnect', socket.pseudo)
    })
})
server.listen(8888)
