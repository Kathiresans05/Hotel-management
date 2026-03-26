const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    floor: { type: String, required: true },
    category: {
        type: String,
        enum: ['AC', 'NON-AC'],
        required: true
    },
    occupancyType: {
        type: String,
        enum: ['single', 'double', 'family'],
        required: true
    },
    basePrice: { type: Number, required: true },
    customPrice: { type: Number },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Waiting', 'Cleaning', 'Maintenance'],
        default: 'Available'
    },
    maintenanceNote: { type: String },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
