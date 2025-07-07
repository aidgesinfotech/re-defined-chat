const db = require('../config/db');

exports.getGroupsByMember = async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const [groups] = await db.query(
      `SELECT g.* FROM groups g
       JOIN groupmember gm ON g.id = gm.groupId
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
         SELECT 
           gm.id,
           gm.groupId,
           gm.senderId,
           gm.message,
           gm.created_at,
           m.fullName AS senderName,
           m.image AS senderImage
         FROM group_messages gm
         JOIN member m ON gm.senderId = m.id
         WHERE gm.groupId = ?
         ORDER BY gm.created_at DESC
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