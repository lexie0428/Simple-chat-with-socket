const express = require('express');
const app = express();

// middlewares
app.use(express.static('public'))

// Listen on port 3000
server = app.listen(3000);

//socket.io instantiation
const io = require('socket.io')(server);

//listen on every connection
io.on('connection', (socket) => {
  console.log('New user connected');

//default username
socket.username = 'Anonymous';

//listen on change username
socket.on('change_username', (data) => {
  console.log(data.username);
  socket.username = data.username;
})

//listen on new_message
socket.on('new_message', (data) => {
  io.sockets.emit('new_message', {message: data.message, username: socket.username})
})

socket.on('typing', (data) => {
  socket.broadcast.emit('typing', {username: socket.username})
})

})