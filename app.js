const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loginRoute = require('./routes/login');
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 5000;
const connect = require('./db/connect');
const Chat = require('./db/chatModel');
app.use(bodyParser.urlencoded({extended: true}));
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

    connect.then(() => {
      let chatMessage = new Chat({ msg: msg, from: "Anonymous" });

      chatMessage.save();
    })

    io.emit('chat message', msg);
  });
});

// app.use((req, res, next) => {
//   if(req.headers && req.headers.authorization) {
//     console.log(req.headers.authorization);
//   }
// })

app.get('/', (req, res) => {
  res.render('index', {login: false})
});
app.get('/msg', (req, res) => {
  connect.then(db => {
    // let data = Chats.find({ message: "Anonymous" });
    Chat.find({}).then(chat => {
      res.json(chat);
    });
  });
  console.log('request for messages');
})
app.use('/login', loginRoute)

// app.post('/login', handleLogin)

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
module.exports = app;
