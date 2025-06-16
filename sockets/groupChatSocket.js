const db = require('../config/db');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinGroup', (groupId) => {
        console.log('joined grp :-----------',`group-${groupId}`);
        
      socket.join(`group-${groupId}`);
    });

    socket.on('groupMessage', async (data) => {
      const { groupId, senderId, message } = data;

      // Save to DB
      await db.query(
        `INSERT INTO group_messages (groupId, senderId, message, created_at)
         VALUES (?, ?, ?, NOW())`,
        [groupId, senderId, message]
      );

      console.log('http://localhost:4205/ -->', data);
      

      io.to(`group-${groupId}`).emit('newGroupMessage', {
        groupId,
        senderId,
        message,
        created_at: new Date()
      });
    });
  });
};