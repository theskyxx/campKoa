// const bcrypt = require('bcrypt') 
var fs = require('fs');
var csv = require('csv');

var strings = [];

    var readStream = fs.createReadStream('testfile.csv');

    var parser = csv.parse({columns:true});
    
    parser.on('readable', function() {
      while(record = parser.read()) {
        strings.push(record);
      }
    });
    
    parser.on('error', function(err) {
      console.log(err.message);
    });
    
    parser.on('finish', (function() {
      console.log(strings);
    }));
    
    readStream.pipe(parser);
    
   