const express = require('express');
const Assignment = require('../models/Assignment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get assignments
router.get('/', auth, async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('teacher', 'name');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create assignment (teacher only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    if (user.role !== 'teacher') return res.status(401).json({ message: 'Not authorized' });
    const assignment = new Assignment({ ...req.body, teacher: req.user.id });
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit assignment
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    assignment.submissions.push({ student: req.user.id, content: req.body.content });
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;