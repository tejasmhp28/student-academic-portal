const express = require('express');
const admin = require('firebase-admin');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Get study plans for user
router.get('/', auth, async (req, res) => {
  try {
    const snapshot = await db.collection('studyplans').where('userId', '==', req.user.uid).get();
    const plans = [];
    snapshot.forEach(doc => {
      plans.push({ id: doc.id, ...doc.data() });
    });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create study plan
router.post('/', auth, async (req, res) => {
  try {
    const { title, subjects, startDate, endDate, reminders } = req.body;
    const docRef = await db.collection('studyplans').add({
      title,
      userId: req.user.uid,
      subjects: subjects || [],
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reminders: reminders || [],
      progress: 0,
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, title, subjects, startDate, endDate });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update progress
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const planDoc = await db.collection('studyplans').doc(req.params.id).get();
    if (!planDoc.exists) return res.status(404).json({ message: 'Plan not found' });
    if (planDoc.data().userId !== req.user.uid) return res.status(401).json({ message: 'Not authorized' });
    
    await db.collection('studyplans').doc(req.params.id).update({ progress: req.body.progress });
    res.json({ message: 'Progress updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;