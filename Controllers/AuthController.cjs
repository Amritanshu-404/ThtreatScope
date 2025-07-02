const User = require('../Models/User.cjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

exports.signup = async (req, res) => {
    try {
        const { username, email, password, company = '', occupation } = req.body;

        if (password.length < 5 || password.length > 10) {
            return res.status(400).json({ message: 'Password must be between 5 and 10 characters long.' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Invalid password format. Include uppercase, lowercase, numbers, and special characters.'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email 🤔.' });
        }

        const newUser = new User({
            username,
            email,
            company,
            occupation,
            password
        });

        await newUser.save();
        console.log(`🙎 New user signed up: ${email} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        res.status(201).json({ message: 'Signup successful 🥳' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Signup failed. Please try again 🫤.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found 🙅‍♂️' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password ❌' });
        }
        console.log(`👤 User logged in: ${email} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful 🥳.', token, expiresIn: 3600 });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Login failed. Please try again 🫤.' });
    }
};
