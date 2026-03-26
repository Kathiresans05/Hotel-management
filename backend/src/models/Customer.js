const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    idProofType: {
        type: String,
        enum: ['Aadhar', 'PAN', 'VoterID', 'DrivingLicense', 'Passport'],
        required: true
    },
    idProofNumber: { type: String, required: true },
    idProofFile: { type: String }, // Path to uploaded file
    address: { type: String, required: true },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
