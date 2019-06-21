var socket = io();
var xhttp = new XMLHttpRequest()
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
   $('#messages').append($('<span>').text('Anonymous:')).append($('<li>').text(msg));
});

$('registerForm').on('submit', function() {
   console.log('here');
});
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      if (!this.response) {
         return;
      }
      var msgs = JSON.parse(this.response)
      console.log('sd: ', typeof msgs);
      msgs.forEach(function(msg) {
         $('#messages').append($('<span>').text(msg.from+':')).append($('<li>').text(msg.msg));
      });

   }
};
xhttp.open("GET", "/msg", true);
xhttp.send();
