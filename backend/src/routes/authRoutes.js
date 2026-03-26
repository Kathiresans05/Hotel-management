const express = require('express');
const router = express.Router();
const { login, verifyOTP, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.get('/me', protect, getMe);

module.exports = router;
