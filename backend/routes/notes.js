const express = require('express');
const admin = require('firebase-admin');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Get all notes for user
router.get('/', auth, async (req, res) => {
  try {
    const snapshot = await db.collection('notes').where('userId', '==', req.user.uid).get();
    const notes = [];
    snapshot.forEach(doc => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create note
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, subject, tags, isPublic } = req.body;
    const docRef = await db.collection('notes').add({
      title,
      content,
      subject,
      tags: tags || [],
      isPublic: isPublic || false,
      userId: req.user.uid,
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, title, content, subject, tags, isPublic });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    const noteDoc = await db.collection('notes').doc(req.params.id).get();
    if (!noteDoc.exists) return res.status(404).json({ message: 'Note not found' });
    if (noteDoc.data().userId !== req.user.uid) return res.status(401).json({ message: 'Not authorized' });
    
    await db.collection('notes').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const noteDoc = await db.collection('notes').doc(req.params.id).get();
    if (!noteDoc.exists) return res.status(404).json({ message: 'Note not found' });
    if (noteDoc.data().userId !== req.user.uid) return res.status(401).json({ message: 'Not authorized' });
    
    await db.collection('notes').doc(req.params.id).delete();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;