const express = require('express');
const { db } = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { firebase_uid, name, email, role = 'farmer' } = req.body;

  if (!firebase_uid || !email) {
    return res.status(400).json({ error: 'firebase_uid and email are required' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE firebase_uid = ?', [firebase_uid]);
    if (existing.length > 0) {
      return res.status(200).json({ message: 'User already exists' });
    }

    await db.query(
      'INSERT INTO users (firebase_uid, name, email, role) VALUES (?, ?, ?, ?)',
      [firebase_uid, name, email, role]
    );

    res.status(201).json({ message: 'User saved to database' });
  } catch (err) {
    console.error('MySQL Insert Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
