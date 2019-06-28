var socket = io();

socket.on('connect', function (){   
    console.log('connected to server');

    socket.emit('createMessage', {
        from:'Ehsan to Moni',
        text:'hi ehsan server from Moni'
    });
});

socket.on('disconnect', function (){
console.log('discoonected from server')
});

socket.on('newMessage', function (Message){
    console.log('new Email resived', Message);
})