var fs = require('fs');
var path = require('path');

module.exports = function(dir, ext, cb){
  fs.readdir(dir, 'utf8', function(err, list){
    var ret = []
    if (err){
      return cb(err)
    }
    for (var i = 0; i < list.length; i++)
      if (path.extname(list[i]) == '.' + ext)
        ret.push(list[i])
      cb(null, ret)
  })
}