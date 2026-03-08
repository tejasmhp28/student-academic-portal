const express = require('express');
const admin = require('firebase-admin');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Get resources
router.get('/', auth, async (req, res) => {
  try {
    const snapshot = await db.collection('resources').get();
    const resources = [];
    snapshot.forEach(doc => {
      resources.push({ id: doc.id, ...doc.data() });
    });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload resource
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, type, url, subject, tags } = req.body;
    const docRef = await db.collection('resources').add({
      title,
      description: description || '',
      type,
      url,
      subject,
      uploadedBy: req.user.uid,
      tags: tags || [],
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, title, description, type, url, subject });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;