const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: true
  },
  jobSeeker: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  employer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Accepted'],
    default: 'Pending'
  },
  coverLetter: {
    type: String,
    maxlength: [1000, 'Cover letter cannot be more than 1000 characters']
  },
  resume: {
    type: String // URL or file path
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  notes: {
    type: String
  }
});

// Prevent duplicate applications
ApplicationSchema.index({ job: 1, jobSeeker: 1 }, { unique: true });

// Static method to get application statistics
ApplicationSchema.statics.getApplicationStats = async function(employerId) {
  const stats = await this.aggregate([
    {
      $match: { employer: mongoose.Types.ObjectId(employerId) }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  return stats;
};

module.exports = mongoose.model('Application', ApplicationSchema);
