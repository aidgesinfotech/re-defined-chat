const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const chatSocket = require('./sockets/chatSocket');
chatSocket(io); // initialize socket handlers

const groupChatSocket = require('./sockets/groupChatSocket');
groupChatSocket(io);

app.use(cors());
app.use(express.json());

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

const memberRoutes = require('./routes/memberRoutes');
app.use('/api/members', memberRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/api/groups', groupRoutes);

const messagesRoutes = require('./routes/messagesRoutes');
app.use('/api/messages', messagesRoutes);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});