var fs = require('fs')
var str

function split(cb){
    fs.readFile(process.argv[2], 'utf8', function okread(err, str){
        cb(str.split('\n'))
    })
}

function displaysplit(str) {
    console.log(str.length - 1)
}

split(displaysplit)