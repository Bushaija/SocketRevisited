const express = require('express');
const socket = require('socket.io');

const app = express();
const port = 4000;

//middleware
app.use(express.static('public'));

//listen server
const server = app.listen(port, () => {
    console.log(`listen server on port ${port}`);
});

//setup socket.io
const io = socket(server);

// listen for any socket client connection
io.on("connection", (socket) => {
    //listen client msg
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})