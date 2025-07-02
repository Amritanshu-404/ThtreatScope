const Enquiry = require('../Models/Enquiry.cjs');
const submitEnquiry = async (req, res) => {
    try {
        const {
            email,
            first_name,
            last_name,
            company,
            occupation,
            country,
            message
        } = req.body;
        if (!email || !first_name || !last_name || !occupation || !country || !message) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        const contact = new Enquiry({
            email,
            first_name,
            last_name,
            company,
            occupation,
            country,
            message,
            submitted_at: new Date()
        });

        await contact.save();

        res.status(200).json({ message: 'Message sent successfully!. We will Contact You.' });
    } catch (error) {
        console.error('Contact Form Error:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

module.exports = submitEnquiry;
