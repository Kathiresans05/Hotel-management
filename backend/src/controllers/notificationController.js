const Notification = require('../models/Notification');

// Fetch all unread or recent notifications for a user
exports.getNotifications = async (req, res) => {
    try {
        // Fetch notifications specific to the user, or system-wide (userId: null)
        const notifications = await Notification.find({
            $or: [{ userId: req.user.id }, { userId: null }]
        }).sort({ createdAt: -1 }).limit(20);

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Mark a specific notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Mark all as read for the current user
exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { $or: [{ userId: req.user.id }, { userId: null }], isRead: false },
            { isRead: true }
        );
        res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
