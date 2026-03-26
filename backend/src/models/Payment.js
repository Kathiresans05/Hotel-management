const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    method: {
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'Bank Transfer'],
        required: true
    },
    transactionId: { type: String },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Completed', 'Pending', 'Failed'],
        default: 'Completed'
    },
    paidAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
