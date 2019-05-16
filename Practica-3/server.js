var http = require('http');
var url = require('url')
const fs = require('fs');

const fileContents = fs.readFileSync('./inventory.json', 'utf8');

try {
  var data = JSON.parse(fileContents)

} catch(err) {
  console.error(err);
};

console.log("Arrancando servidor...")

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var filetype = q.pathname.split(".")[1]
  var cookie = req.headers.cookie;
  var product;
  console.log(filename)
  switch (q.pathname) {

    //-- Pagina principal
    case "/":

        filename = "index.html";
        filetype = 'html';

      break
  case "/login":

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

  case "/product":
    console.log("recibe petición ajax");
  //-- Se intenta acceder a un recurso que no existe
  default:
    content = "Error";
    res.statusCode = 404;
}
  console.log("filename:" + filename);

  if (!cookie) {
    filename = "front/notlogged/" + filename;

  }else {
    filename = "front/logged/" + filename;

  }

  console.log("filename:" + filename);
  console.log("filetype:" + filetype);
  fs.readFile(filename, function(err, data){
    if (filetype == "html"){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);

  }else if (filetype == "css") {

    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(data);

  }else if (filetype == "textplain") {
    res.setHeader('Content-Type', 'text/plain')
    res.write(content);
    res.end();
    console.log("Peticion atendida text")
  }else if (filetype == "js") {
    res.setHeader('Content-Type', 'application/javascript')
    res.write(content);
    res.end();
    console.log("Peticion atendida js")
  }else{
    console.log("Error fyletype")
  }

});


}).listen(8080);
