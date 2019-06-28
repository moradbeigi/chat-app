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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'welcom to the chatapp',
        crearAt: new Date().getDay()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        crearAt: new Date().getDate()
    })


    socket.on('createMessage', (Message)=>{
        console.log('createMessage', Message)

        io.emit('newMessage', {
            from: Message.from,
            text: Message.text,
            crearAt: new Date().getTime()
        })

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