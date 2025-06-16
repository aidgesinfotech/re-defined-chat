const db = require('../db');

exports.getAllGroupsForMember = async (memberId) => {
  const [rows] = await db.query(
    `SELECT g.* FROM groups g
     JOIN groupMember gm ON g.id = gm.groupId
     WHERE gm.memberId = ?`, [memberId]);
  return rows;
};
