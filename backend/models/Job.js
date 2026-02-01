const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a job description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  requirements: [{
    type: String
  }],
  responsibilities: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
    default: 'Full-time'
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'],
    default: 'Entry Level'
  },
  salary: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  applicationDeadline: {
    type: Date,
    required: [true, 'Please add an application deadline']
  },
  employer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: [true, 'Please add company name']
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Filled'],
    default: 'Open'
  },
  applicants: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
JobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create index for text search
JobSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Job', JobSchema);
