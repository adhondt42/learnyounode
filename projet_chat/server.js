var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client OK")
    socket.emit('message', 'Vous êtes bien connecté !'); // un client
    
    socket.broadcast.emit('message', 'Nouvel arrivant :' + socket.pseudo); // tous les client


    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    })
    socket.on('new_pseudo', (pseudo) => {
    socket.pseudo = pseudo
    })
    socket.on('petit_nouveau', function(pseudo) {
        socket.pseudo = pseudo;

    });
})
server.listen(8888)