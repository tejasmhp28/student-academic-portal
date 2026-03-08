const express = require('express');
const StudyPlan = require('../models/StudyPlan');
const auth = require('../middleware/auth');

const router = express.Router();

// Get study plans for user
router.get('/', auth, async (req, res) => {
  try {
    const plans = await StudyPlan.find({ user: req.user.id });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create study plan
router.post('/', auth, async (req, res) => {
  try {
    const plan = new StudyPlan({ ...req.body, user: req.user.id });
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update progress
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const plan = await StudyPlan.findById(req.params.id);
    if (!plan || plan.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    plan.progress = req.body.progress;
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;