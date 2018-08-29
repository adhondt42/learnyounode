var http = require('http');
var fs = require('fs');
var ent = require('ent') // evite injection de js ??

var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});


var io = require('socket.io').listen(server) // Chargement de socket.io

io.sockets.on('connection', function (socket) {

    socket.on('new_client', (pseudo) => {
        pseudo = ent.encode(pseudo)
        socket.pseudo = pseudo
        socket.broadcast.emit('new_client', pseudo)
    })

    socket.on('message', (message) => {
        message = ent.encode(message)
        console.log(message)
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message})
    })
})


server.listen(8888)