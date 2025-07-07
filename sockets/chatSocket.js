const db = require('../config/db');

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId) => {      
      socket.join(`user_${userId}`);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        const [result] = await db.query(
            'INSERT INTO messages (senderId, receiverId, message, created_at) VALUES (?, ?, ?, NOW())',
        [senderId, receiverId, message]
    );
    
    const msgObj = {
        id: result.insertId,
        senderId,
        receiverId,
        message,
        created_at: new Date()
    };
    
    io.to(`user_${receiverId}`).emit('newMessage', msgObj);
    io.to(`user_${senderId}`).emit('newMessage', msgObj);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = chatSocket;