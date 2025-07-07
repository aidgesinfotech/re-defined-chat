const db = require('../config/db');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinGroup', (groupId) => {
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

      let [memberData] = await db.query(`SELECT fullName, image FROM member WHERE id = ?`, [senderId]);

      io.to(`group-${groupId}`).emit('newGroupMessage', {
        groupId,
        senderId,
        message,
        senderName : memberData[0].fullName,
        senderImage : memberData[0].image,
        created_at: new Date()
      });
    });
  });
};