var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernumber = 0;
var users = [];

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.css');

});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');

});

//--Servir lista de conectados
app.get('/list', function(req, res){
  res.send("Hay 0 usuarios conectados");
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  id = generateid()
  users.push(generateid());
  console.log('--> Usuario conectado!');
  socket.id = id;
  console.log(socket.id)

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log(users.type);
    console.log(typeof users);
    for(j=0; j <= users.lenght; j++){
      console.log(j);
        if (socket.id == users){
          console.log("entra en if");
          users.splice(j, 1);
        };
    };
    console.log(users)
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
        socket.emit('new_message', "Hay " + usernumber + " usuarios conectados");
        break;
      case '/help':
        var commands = "/help:lists all commands, /list:user number, /date:server date, /hello:the server greets you"

        socket.emit('new_message', commands);
        break;

      case '/hello':
        var greeting = "hello from the server";
        socket.emit('new_message', greeting);
        break;

      case '/date':
        var answer = date();
        answer = answer[0].toString() + "/" + answer[1].toString() + "/" +answer[2].toString();
        socket.emit('new_message', answer);
        break;

      default:
      //-- Emitir un mensaje a todos los clientes conectados
        io.emit('new_message', msg);
    }

  })

function generateid(){

  id = Math.floor(Math.random() * (1000 - 600) + 600);
  for (j=0; j <= users.length; j++){
    if (id == users[j]){
      Generateid();
    }
  }
return id;
}

function date(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  return [dd, mm, yyyy];
}
});
