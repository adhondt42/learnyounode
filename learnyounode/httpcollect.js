var http = require('http')
var bl = require ('bl')

if (!process.argv[2])
  return 
http.get(process.argv[2], function(res){
  res.pipe(bl(function (err, data) { 
    if (err)
      console.error(err)
    else
    {
      data = data.toString()
      console.log(data.length)
      console.log(data)
    }
  })
)})