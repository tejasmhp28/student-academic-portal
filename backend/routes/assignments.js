const express = require('express');
const admin = require('firebase-admin');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Get assignments
router.get('/', auth, async (req, res) => {
  try {
    const snapshot = await db.collection('assignments').get();
    const assignments = [];
    snapshot.forEach(doc => {
      assignments.push({ id: doc.id, ...doc.data() });
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create assignment (teacher only)
router.post('/', auth, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (userDoc.data().role !== 'teacher') return res.status(401).json({ message: 'Not authorized' });
    
    const { title, description, subject, dueDate } = req.body;
    const docRef = await db.collection('assignments').add({
      title,
      description: description || '',
      subject,
      dueDate: new Date(dueDate),
      teacher: req.user.uid,
      submissions: [],
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, title, description, subject, dueDate });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit assignment
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const assignmentDoc = await db.collection('assignments').doc(req.params.id).get();
    if (!assignmentDoc.exists) return res.status(404).json({ message: 'Assignment not found' });
    
    const submissions = assignmentDoc.data().submissions || [];
    submissions.push({
      student: req.user.uid,
      content: req.body.content,
      submittedAt: new Date(),
    });
    
    await db.collection('assignments').doc(req.params.id).update({ submissions });
    res.json({ message: 'Submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;