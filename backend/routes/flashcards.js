const express = require('express');
const admin = require('firebase-admin');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Get flashcards for user
router.get('/', auth, async (req, res) => {
  try {
    const snapshot = await db.collection('flashcards').where('userId', '==', req.user.uid).get();
    const flashcards = [];
    snapshot.forEach(doc => {
      flashcards.push({ id: doc.id, ...doc.data() });
    });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create flashcard
router.post('/', auth, async (req, res) => {
  try {
    const { question, answer, subject, difficulty } = req.body;
    const docRef = await db.collection('flashcards').add({
      question,
      answer,
      subject,
      difficulty: difficulty || 'medium',
      userId: req.user.uid,
      nextReview: new Date(),
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, question, answer, subject, difficulty });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flashcard
router.put('/:id', auth, async (req, res) => {
  try {
    const flashcardDoc = await db.collection('flashcards').doc(req.params.id).get();
    if (!flashcardDoc.exists) return res.status(404).json({ message: 'Flashcard not found' });
    if (flashcardDoc.data().userId !== req.user.uid) return res.status(401).json({ message: 'Not authorized' });
    
    await db.collection('flashcards').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete flashcard
router.delete('/:id', auth, async (req, res) => {
  try {
    const flashcardDoc = await db.collection('flashcards').doc(req.params.id).get();
    if (!flashcardDoc.exists) return res.status(404).json({ message: 'Flashcard not found' });
    if (flashcardDoc.data().userId !== req.user.uid) return res.status(401).json({ message: 'Not authorized' });
    
    await db.collection('flashcards').doc(req.params.id).delete();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;