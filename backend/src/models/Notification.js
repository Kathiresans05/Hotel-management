const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: If null, it's a broadcast to all users
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['info', 'warning', 'success', 'error', 'booking'],
        default: 'info'
    },
    isRead: { type: Boolean, default: false },
    actionUrl: { type: String } // Optional link the user can click
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
