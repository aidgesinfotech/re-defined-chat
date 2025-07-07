const db = require('../db');

exports.getGroupMembers = async (groupId) => {
  const [rows] = await db.query(
    `SELECT m.* FROM members m
     JOIN groupMember gm ON m.id = gm.memberId
     WHERE gm.groupId = ?`, [groupId]);
  return rows;
};
