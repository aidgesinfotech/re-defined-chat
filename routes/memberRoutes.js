// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /members/:id → get all members except current
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query(
      'SELECT id, name FROM member WHERE id != ?', 
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
