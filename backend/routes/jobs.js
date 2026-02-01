const express = require('express');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getEmployerJobs
} = require('../controllers/jobController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer'), createJob);

router.route('/employer/my-jobs')
  .get(protect, authorize('employer'), getEmployerJobs);

router.route('/:id')
  .get(getJob)
  .put(protect, authorize('employer'), updateJob)
  .delete(protect, authorize('employer'), deleteJob);

module.exports = router;
