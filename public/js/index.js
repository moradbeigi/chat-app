var socket = io();

socket.on('connect', function (){   
    console.log('connected to server');

    // socket.emit('createMessage', {
    //     from:'Ehsan to Moni',
    //     text:'hi ehsan server from Moni'
    // });
});

socket.on('disconnect', function (){
console.log('discoonected from server')
});

socket.on('newMessage', function (message){
    console.log('new Email resived', message);

    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li)
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
        jQuery('[name=message]').val('')
    })
});

var locationButton = jQuery('#send-location')

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not suport by your browser')
    }

    locationButton.attr('disable', 'disable').text('sending location..... ')

    navigator.geolocation.getCurrentPosition( function (position) {
        locationButton.removeAttr('disable').text('send location')
        socket.emit('creatLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        
    }, function(err) {
        alert('unable fetch location')
        locationButton.removeAttr('disable').text('send location');
    });
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> my cuorent lication </a>');

    li.text (`${message.from}: `)
    a.attr ('href', message.url);

    li.append(a)
    jQuery('#messages').append(li)
})