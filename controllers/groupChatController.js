const db = require('../config/db');

exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  const { offset = 0, limit = 15 } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT * FROM (
         SELECT * FROM groupMessages
         WHERE groupId = ?
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?
       ) AS sub
       ORDER BY created_at ASC`,
      [groupId, parseInt(limit), parseInt(offset)]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching group messages:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
