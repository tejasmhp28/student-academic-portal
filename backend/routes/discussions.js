const express = require('express');
const Discussion = require('../models/Discussion');
const auth = require('../middleware/auth');

const router = express.Router();

// Get discussions
router.get('/', auth, async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('author', 'name').populate('replies.author', 'name');
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create discussion
router.post('/', auth, async (req, res) => {
  try {
    const discussion = new Discussion({ ...req.body, author: req.user.id });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add reply
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
    discussion.replies.push({ content: req.body.content, author: req.user.id });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;