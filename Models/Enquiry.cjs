const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    email: { type: String, required: true, match: /@/, description: 'User email' },
    first_name: { type: String, required: true, description: 'First name' },
    last_name: { type: String, required: true, description: 'Last name' },
    company: { type: String, description: 'Company name (optional)' },
    occupation: { type: String, description: 'User occupation' },
    country: { type: String, description: 'Country name' },
    message: { type: String, required: true, description: 'User\'s message or query' },
    submitted_at: { type: Date, default: Date.now, description: 'Date of submission' }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
