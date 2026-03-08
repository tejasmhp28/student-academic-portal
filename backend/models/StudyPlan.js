const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjects: [{
    name: { type: String, required: true },
    hours: { type: Number, required: true },
    completed: { type: Number, default: 0 }
  }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reminders: [{ type: Date }],
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);