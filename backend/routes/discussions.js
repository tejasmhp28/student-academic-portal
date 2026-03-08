const express = require('express');
const admin = require('firebase-admin');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Get discussions
router.get('/', auth, async (req, res) => {
  try {
    const snapshot = await db.collection('discussions').orderBy('createdAt', 'desc').get();
    const discussions = [];
    snapshot.forEach(doc => {
      discussions.push({ id: doc.id, ...doc.data() });
    });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create discussion
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, assignment } = req.body;
    const docRef = await db.collection('discussions').add({
      title,
      content,
      author: req.user.uid,
      assignment: assignment || null,
      replies: [],
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, title, content });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add reply
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const discussionDoc = await db.collection('discussions').doc(req.params.id).get();
    if (!discussionDoc.exists) return res.status(404).json({ message: 'Discussion not found' });
    
    const replies = discussionDoc.data().replies || [];
    replies.push({
      content: req.body.content,
      author: req.user.uid,
      createdAt: new Date(),
    });
    
    await db.collection('discussions').doc(req.params.id).update({ replies });
    res.json({ message: 'Reply added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;