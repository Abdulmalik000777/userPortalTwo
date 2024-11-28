const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",  // React app running here
    methods: ["GET", "POST"]
  }
});
