var socket = io.connect('http://localhost:8888')
var pseudo = prompt('Pseudo ?')
while (pseudo === '' || pseudo === undefined)
{
    pseudo = prompt('You should choose a pseudo:')
}

socket.emit('new_client', pseudo)
document.title = pseudo + ' - ' + document.title;

socket.on('new_client', (data) => {
    if (data.txt_area == 1)
        $('#zone_chat').prepend('<p><em> [' + data.pseudo + ']' + ' joined elgato!</em></p><br />')
    $('#user_list').append('<p id="' + data.pseudo + '">' + data.pseudo + '</p>')

})

socket.on('message', (data) => {
    insert_message(data.pseudo, data.message)
})

socket.on('usr_disconnect', (pseudo) => {
    $('#zone_chat').prepend('<p><em> [' + pseudo + ']' + '  leaved elgato!</em></p><br />')
    $('#' + pseudo).remove()

})


$('#new_msg').submit(() => {
    var message = $('#msg_content').val()                           // .val ne marche pas ?
    socket.emit('message', message)
    insert_message(pseudo, message)
    $('#message').val('').focus();
    return false                                                    // empeche d'aller vers action="/"
})

function insert_message(pseudo, message) {
    $('#zone_chat').prepend('<p class="comment"><strong>' + pseudo + ' : </strong> ' + message + '</p>');
}