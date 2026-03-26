const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    gstPercent: { type: Number, default: 12 },
    otpEnabled: { type: Boolean, default: true },
    smsEnabled: { type: Boolean, default: false },
    emailEnabled: { type: Boolean, default: false },
    invoicePrefix: { type: String, default: 'INV-' },
    branding: {
        name: { type: String, default: 'LodgeMS' },
        logo: { type: String },
        tagline: { type: String }
    },
    backupFrequency: { type: String, default: 'Daily' }
}, { timestamps: true });

module.exports = mongoose.model('SystemSetting', settingSchema);
