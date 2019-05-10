

var fs = require('fs');

function show_file(err, data){
  console.log(data);
}

fs.readfile('prueba.txt', 'utf8', show_file);
