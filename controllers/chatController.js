const db = require('../config/db');

exports.getAllMembers = async (req, res) => {
  const myId = req.query.myId;
  const [rows] = await db.query('SELECT * FROM member WHERE id != ?', [myId]);
  res.json(rows);
};

exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;
  const [rows] = await db.query(
    `SELECT * FROM messages 
     WHERE (senderId = ? AND receiverId = ?) 
        OR (senderId = ? AND receiverId = ?) 
     ORDER BY created_at ASC`,
    [senderId, receiverId, receiverId, senderId]
  );
  res.json(rows);
};
