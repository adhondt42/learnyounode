var fs = require('fs')
var str = fs.readFileSync(process.argv[2])
str = str.toString()
var ret = str.split("\n");
console.log(ret.length - 1);