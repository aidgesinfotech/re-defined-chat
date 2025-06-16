const db = require('../config/db');

exports.getGroupsByMember = async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const [groups] = await db.query(
      `SELECT g.* FROM groups g
       JOIN groupMember gm ON g.id = gm.groupId
       WHERE gm.memberId = ?`,
      [memberId]
    );

    res.json(groups);
  } catch (err) {
    console.error('Error fetching groups:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  const { offset = 0, limit = 15 } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT * FROM (
         SELECT * FROM group_messages
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
