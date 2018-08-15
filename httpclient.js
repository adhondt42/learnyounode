var http = require('http')

http.get(process.argv[2], function(res){
  var ret = ""
  res.setEncoding = ('utf8')
  res.on("data", function(data) { 
    ret += data + "\n"
  })
  res.on("end", function(){
    console.log(ret)
  })
})