const User = require("../Models/User.cjs");

const ForgotPassword = async (req, res) => {
    try {
        const { email, username, newPassword } = req.body;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: 'Remember the Password Format. Its Between 5-10 using Az-Zz @$!%*?&.'
            });
        }

        const user = await User.findOne({ email });

        if (!user || user.username !== username) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful. You can now log in with your new password.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'An error occurred while resetting the password. Please try again later.' });
    }
};

module.exports = ForgotPassword;
