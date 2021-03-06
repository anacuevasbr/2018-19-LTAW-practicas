function main() {
  console.log("Hola!!!!")

  //-- Crear un socket.io. Se establece la conexion
  //-- con el servidor
  var socket = io();

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value);

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
    msg.val = "";
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    console.log(socket);
    var para = document.createElement("p");
    para.className = "message";
    var text = document.createTextNode(msg);
    para.appendChild(text);
    display.appendChild(para);
    //display.innerHTML += msg + "<br>";
  });
}
