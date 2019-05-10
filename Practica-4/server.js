var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernumber = 0;
var ids = 38;

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicituado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  usernumber += 1;
  ids += 1;
  console.log('--> Usuario conectado!');
  socket.id = ids;
  console.log(socket.id)

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    usernumber += -1;
    console.log('--> Usuario Desconectado');
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {
    socketId = socket.id;
    //-- Notificarlo en la consola del servidor
    console.log("Mensaje recibido: " + msg)
    switch(msg){
      case '/list':
        console.log('entrado en list');
        io.sockets.socket(socketId).emit('new_message', usernumber);
        break;
      default:
      //-- Emitir un mensaje a todos los clientes conectados
        io.emit('new_message', msg);
    }

  })

});
