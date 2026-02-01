const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Job Seeker only)
exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Check if job is still open
    if (job.status !== 'Open') {
      return res.status(400).json({
        success: false,
        error: 'This job is no longer accepting applications'
      });
    }

    // Check if application deadline has passed
    if (new Date(job.applicationDeadline) < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'Application deadline has passed'
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      jobSeeker: req.user.id,
      employer: job.employer,
      coverLetter,
      resume: req.user.resume
    });

    // Increment applicants count
    job.applicants += 1;
    await job.save();

    const populatedApplication = await Application.findById(application._id)
      .populate('job', 'title companyName location')
      .populate('jobSeeker', 'name email phone');

    res.status(201).json({
      success: true,
      data: populatedApplication
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'You have already applied for this job'
      });
    }
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all applications for logged in job seeker
// @route   GET /api/applications/my-applications
// @access  Private (Job Seeker only)
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobSeeker: req.user.id })
      .populate('job', 'title companyName location jobType status')
      .sort('-appliedAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Make sure user is job owner
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('jobSeeker', 'name email phone skills experience education resume')
      .sort('-appliedAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all applications for logged in employer
// @route   GET /api/applications/employer/all
// @access  Private (Employer only)
exports.getEmployerApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ employer: req.user.id })
      .populate('job', 'title location')
      .populate('jobSeeker', 'name email phone')
      .sort('-appliedAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }

    // Make sure user is the employer
    if (application.employer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this application'
      });
    }

    application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        reviewedAt: Date.now(),
        notes: req.body.notes
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('jobSeeker', 'name email phone');

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private (Job Seeker only - withdraw application)
exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }

    // Make sure user is the applicant
    if (application.jobSeeker.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this application'
      });
    }

    await application.deleteOne();

    // Decrement applicants count
    const job = await Job.findById(application.job);
    if (job) {
      job.applicants = Math.max(0, job.applicants - 1);
      await job.save();
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
