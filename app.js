const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 5000;

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


//create an event listener
//To listen to messages
io.on("connection", (socket)=>{
  console.log("user connected");
  socket.on("disconnect", ()=>{
    console.log("Disconnected")
  })
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/login', (req, res)=> {
  res.render('login');
})

app.post('/login', (req, res)=> {
  handleLogin(req, res)
})

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
