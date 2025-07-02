const { Password } = require('@mui/icons-material');
const User = require('../Models/User.cjs');

exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized 🚫' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found 🫤.' });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            company: user.company,
            password: user.password,
            occupation: user.occupation,
            created_at: user.created_at,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'An error occurred while fetching user data 🫤.' });
    }
};
