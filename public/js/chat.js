(function() {
  //make connection
  const socket = io.connect('http://localhost:3000');
  const message = document.getElementById('message');
  const username = document.getElementById('username');
  const send_message = document.getElementById('send_message');
  const send_username = document.getElementById('send_username');
  const chatroom = document.getElementById('chatroom');

  //emit a username
  send_username.addEventListener('click', () => {
    console.log(username.value);
    socket.emit('change_username', {username: username.value});
  })

  //emit message
  send_message.addEventListener('click', () => {
    console.log(message.value);
    socket.emit('new_message', {message: message.value});
  })

  //listen on new message
  socket.addEventListener('new_message', (data) => {
    console.log(data);
    const newMes = document.createElement('p');
    newMes.className = 'message';
    newMes.textContent = data.username + ": " + data.message;
    chatroom.append(newMes);
  })

  //emit typing
  message.addEventListener('keypress', () => {
    socket.emit('typing');
  })

  //listen on typing
  socket.addEventListener('typing', (data) => {
    feedback.innerHTML = '<p><i>' + data.username + ' is typing message...' + '</i></p>';
  })

})();