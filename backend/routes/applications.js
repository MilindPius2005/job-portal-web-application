const express = require('express');
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  getEmployerApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/applicationController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, authorize('jobseeker'), applyForJob);

router.route('/my-applications')
  .get(protect, authorize('jobseeker'), getMyApplications);

router.route('/employer/all')
  .get(protect, authorize('employer'), getEmployerApplications);

router.route('/job/:jobId')
  .get(protect, authorize('employer'), getJobApplications);

router.route('/:id')
  .put(protect, authorize('employer'), updateApplicationStatus)
  .delete(protect, authorize('jobseeker'), deleteApplication);

module.exports = router;
