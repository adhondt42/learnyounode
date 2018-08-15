var dir = process.argv[2]
var ext = process.argv[3]
var mymodule = require('./module.js')


mymodule(dir, ext, function (err, list){
    for (var i = 0; i < list.length; i++)
        console.log(list[i])
})