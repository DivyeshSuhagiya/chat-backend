require('dotenv').config();
require('./config/database').connect();
const express = require("express");
const app = express();
app.use(express.json());
let http = require('http');
const cors = require('cors')
const bodyParser = require('body-parser');
const socketIO = require('socket.io')
const MESSAGE = require('./model/message')

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const routes = require('./route/index.js')

app.use(cors())

app.use(
  express.json({
      limit: '1024mb',
  }),
)
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', routes)

const server = http.createServer(app);

const io = socketIO(server);
io.on('connect' ,async (socket) => {
    console.log('Connected......');

    socket.on('Message' , async (data) => {
      data.createTime = new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      await MESSAGE.create(data);
      const allMessage = await MESSAGE.find({});
      

      if(!data){
        socket.emit('Message' , allMessage)
        socket.broadcast.emit('Message' , allMessage)
      }
      else{
        socket.emit('Message' , allMessage)
      socket.broadcast.emit('Message' , allMessage)
      }
    })
    const allMessage = await MESSAGE.find({});

    socket.emit('Message' , allMessage)
    socket.broadcast.emit('Message' , allMessage)

  })

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
  });
