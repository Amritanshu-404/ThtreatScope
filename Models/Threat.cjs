const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    threat_name: String,
    description: String,
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
    owasp_category: String,
    device_details: String,
    port_service: String,
    recommendation: String,
    detected_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Threat', threatSchema);
