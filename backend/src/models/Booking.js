const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkInDateTime: { type: Date, required: true },
    checkOutDateTime: { type: Date },
    durationHours: { type: Number },
    pricingType: { type: String, enum: ['normal', 'custom'], default: 'normal' },
    roomCharge: { type: Number, required: true },
    extraCharges: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Partial Paid', 'Pending'],
        default: 'Pending'
    },
    bookingStatus: {
        type: String,
        enum: ['Reserved', 'Checked-In', 'Checked-Out', 'Cancelled'],
        default: 'Reserved'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
