const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('a user connected');
  // Further WebSocket logic here
});
