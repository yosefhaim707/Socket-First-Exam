import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3011',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('User is connected!');
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data)
    })
    socket.on('disconnect', () => {
        console.log('User is disconnected')
    })

});

const PORT = 3012;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

