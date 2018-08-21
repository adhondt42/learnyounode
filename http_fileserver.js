var http = require('http')
var fs = require('fs')

var port = process.argv[2]
var file = process.argv[3]

http.createServer( (req, res) => {
    fs.createReadStream(file).pipe(res)
}).listen(port)
