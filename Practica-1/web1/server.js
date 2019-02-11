var http = require('http');
var url = require('url')
const fs = require('fs');
const fileContents = fs.readFileSync('./inventory.json', 'utf8');

try {
  const data = JSON.parse(fileContents)
  console.log(data);
} catch(err) {
  console.error(err);
}

console.log("Arrancando servidor...")

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var filetype = q.pathname.split(".")[1]
  console.log(q);
  console.log(q.pathname);
  console.log(filetype);
  if (q.pathname == ('/')){
    filename = "index.html";
    filetype = 'html';
  }

  fs.readFile(filename, function(err, data){
    if (filetype == "html"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
    console.log("Peticion atendida html")
  }else if (filetype == "css") {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(data);
    console.log("Peticion atendida css")

  }else{
    console.log("Error")
  }

});


}).listen(8080);
