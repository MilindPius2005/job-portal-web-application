const express = require('express');
const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount
} = require('../controllers/userController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteAccount);

router.put('/update-password', protect, updatePassword);

module.exports = router;
