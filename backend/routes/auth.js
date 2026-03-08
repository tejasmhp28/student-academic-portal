const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();
const db = admin.firestore();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Store user profile in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      role: role || 'student',
      avatar: '',
      badges: [],
      streak: 0,
      points: 0,
      createdAt: new Date(),
    });

    // Generate JWT token
    const token = jwt.sign({ uid: userRecord.uid, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, uid: userRecord.uid });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    
    // Generate JWT token (Firebase auth would verify password)
    const token = jwt.sign({ uid: userRecord.uid, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, uid: userRecord.uid });
  } catch (err) {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Get user
router.get('/me', auth, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ uid: req.user.uid, ...userDoc.data() });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;