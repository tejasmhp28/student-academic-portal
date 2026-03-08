const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.log('Firebase already initialized');
}

const app = express();
const PORT = process.env.PORT || 5000;
const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/studyplans', require('./routes/studyplans'));

// Health check
app.get('/', (req, res) => {
  res.send('Student Academic Backend - Firebase');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});