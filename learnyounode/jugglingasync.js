var http = require ('http')
var bl = require('bl')
var ret = []
var count = 0

function display(ret)
{
    for (var i = 0; i < 3; i++) {
        console.log(ret[i])
    }
}

function dlData(i) {
    http.get(process.argv[i + 2], function (data) {
        data.pipe(bl(function(err, data) {
            if (err)
                return console.error("ERROR" + err)
            data = data.toString()
            ret.push(data)
            count++
            if (count === 3) // Comment etre sur d'avoir tout reçu ?
            display(ret)    
        }))

        }
    )
}

for (var i = 0; i < 3; i++){
    dlData(i)
}

