var path = require('path')
var fs = require('fs')
var dir = process.argv[2]
var ext = process.argv[3]

ext = "." + ext
fs.readdir(dir, 'utf8', function cb(err, dirName) {
    for ( var i = 0; i < dirName.length; i++)
        if (path.extname(dirName[i]) == ext) 
            console.log((dirName[i]))
})