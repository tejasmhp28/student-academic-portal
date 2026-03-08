const express = require('express');
const Flashcard = require('../models/Flashcard');
const auth = require('../middleware/auth');

const router = express.Router();

// Get flashcards for user
router.get('/', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user.id });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create flashcard
router.post('/', auth, async (req, res) => {
  try {
    const flashcard = new Flashcard({ ...req.body, user: req.user.id });
    await flashcard.save();
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flashcard
router.put('/:id', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard || flashcard.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    const updated = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete flashcard
router.delete('/:id', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard || flashcard.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;