const db = require('../config/db');

exports.activateChatService = async (req, res) => {
  try {
    console.log('Activated Chat Service');
    res.status(200).json({ message: 'Activated Chat Service' });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMessagesBetweenMembers = async (req, res) => {
  const { senderId, receiverId } = req.params;
  const { beforeMessageId, limit = 15 } = req.query;

  try {
    let query = `
      SELECT * FROM messages
      WHERE ((senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?))
    `;

    const params = [senderId, receiverId, receiverId, senderId];

    // Pagination: get messages before this ID
    if (beforeMessageId) {
      query += ' AND id < ?';
      params.push(beforeMessageId);
    }

    query += ' ORDER BY id DESC LIMIT ?';
    params.push(parseInt(limit));

    const [rows] = await db.query(query, params);

    // Return them in ASC order for frontend display (older to newer)
    res.json(rows.reverse());
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await db.query(
      `INSERT INTO messages (senderId, receiverId, message, created_at)
       VALUES (?, ?, ?, NOW())`,
      [senderId, receiverId, content]
    );
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
