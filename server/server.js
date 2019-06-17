const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

const PubilcPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New User connection');

    io.on('disconnect', ()=>{
        console.log('user was disconnected')
    })
})

app.use(express.static(PubilcPath));


server.listen(port, ()=>{
    console.log(`active on port ${port}`);
})