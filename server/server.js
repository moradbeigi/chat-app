const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var {generateMessage} = require('./utils/message');

const PubilcPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New User connection');

    socket.emit('newMessage', generateMessage('Admin', 'welcom to chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'))


    socket.on('createMessage', (message)=>{
        console.log('createMessage', message)

        io.emit('newMessage', generateMessage(message.from, message.text) )

        // socket.broadcast.emit('newMessage', {
        //     from: Message.from,
        //     text: Message.text,
        //     creatAt: new Date().getTime()
        // })
    })

    io.on('disconnect', ()=>{
        console.log('user was disconnected')
    })
})

app.use(express.static(PubilcPath));


server.listen(port, ()=>{
    console.log(`active on port ${port}`);
})