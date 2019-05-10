var http = require('http');
var url = require('url')
const fs = require('fs');


console.log("Arrancando servidor...")

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var filetype = q.pathname.split(".")[1]
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)
  console.log(q.pathname)
  switch (q.pathname) {

    //-- Pagina principal
    case "/":
    console.log("entra en /" )
        filename = "index.html";
        filetype = 'html';

      break
  case "/login":
  console.log("entra en /login" )
      content = "Registrado! Cookie enviada al navegador!"
      filetype = "textplain"
      //-- ESTABLECER LA COOKIE!!
      res.setHeader('Set-Cookie', 'user=ana')

      break
  case "/cart":
      content = "Añadido al carrito!"
      filetype = "textplain"
      //-- ESTABLECER LA COOKIE!!
      res.setHeader('Set-Cookie', 'product=lisa')

  break
  //-- Se intenta acceder a un recurso que no existe
  default:
    content = "Error";
    res.statusCode = 404;
}
  console.log("Antes del readfile");

  if (!cookie) {
    filename = "front/notlogged/" + filename;

  }else {
    filename = "front/logged/" + filename;

  }

  console.log("filename:" + filename);
  console.log("filetype:" + filetype);
  fs.readFile(filename, function(err, data){
    if (filetype == "html"){
    console.log("entra en mandar html" )
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
    console.log("Peticion atendida html")
  }else if (filetype == "css") {
    console.log("entra en mandar css" )
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(data);
    console.log("Peticion atendida css")
  }else if (filetype == "textplain") {
    res.setHeader('Content-Type', 'text/plain')
    res.write(content);
    res.end();
    console.log("Peticion atendida text")
  }else{
    console.log("Error fyletype")
  }

});


}).listen(8080);
