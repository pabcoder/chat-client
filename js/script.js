const socket = io('ws://localhost:4000');
let nombre = null;
let color = null;

const colors = [
  'red',
  'blue',
  'yellow',
  'white',
  'black',
  'cyan',
];

const chatDialog = document.getElementById("chat-dialog");

socket.on("connect", () => {
  socket.on("display_msgs", (data) => {
    const ventana = document.getElementById('chat-window');
    ventana.innerHTML = '';

    data.forEach(element => {
      agregarChat(element);
    });
  });
}); 

function emitirEvento() {
  const texto = document.getElementById('chat-input').value;
  
  socket.emit("new_msg", { nombre, texto, color});
}

function agregarChat({nombre, texto, color}) {
  const ventana = document.getElementById('chat-window');

  ventana.innerHTML += "<div class='mensaje'><span style='color: " + color + "'>" + nombre + "</span><div>" + texto + "</div></div>";
}

function guardarNombre() {
  nombre = document.getElementById('chat-nombre').value;
  color = colors[Math.floor(Math.random() * colors.length) + 1];

  chatDialog.close();
}

if (!nombre) {
  chatDialog.showModal();
}