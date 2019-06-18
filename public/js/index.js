var socket = io();
$('textarea').keydown(function (e)
{
   if (e.which === 13) {
      var t = $('textarea').val();
      console.log('t: ', t)
      socket.emit('chat message', $('textarea').val());
      $('textarea').val("");
      var h = $('textarea').height();
      console.log('h: ', h);
      $('textarea').height(28)
   }
});
socket.on('chat message', function(msg) {
   console.log('msg from server: ', msg);
   $('#messages').append($('<li>').text(msg));
})
