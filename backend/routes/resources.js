const express = require('express');
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

const router = express.Router();

// Get resources
router.get('/', auth, async (req, res) => {
  try {
    const resources = await Resource.find().populate('uploadedBy', 'name');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload resource
router.post('/', auth, async (req, res) => {
  try {
    const resource = new Resource({ ...req.body, uploadedBy: req.user.id });
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;