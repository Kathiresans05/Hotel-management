const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

// Get all notifications for current user
router.get('/', protect, notificationController.getNotifications);

// Mark a specific notification as read
router.put('/:id/read', protect, notificationController.markAsRead);

// Mark all notifications as read
router.put('/read-all', protect, notificationController.markAllAsRead);

module.exports = router;
