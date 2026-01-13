const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user (Signup)
// @route   POST /api/auth/signup
// @access  Public
exports.signupUser = async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        return res.status(400).json({ message: 'Please provide both email and name' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            // User already exists, update name and send OTP
            user.name = name;
            await user.save();
        } else {
            // Create new user
            user = await User.create({ email, name });
        }

        // Generate mock OTP
        const otp = '123456';
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        console.log(`[SIGNUP] OTP for ${email}: ${otp}`);

        res.status(200).json({
            message: 'OTP sent successfully',
            // In production, don't send OTP in response. For dev/assignment, it's helpful.
            debug_otp: otp
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login existing user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Please add an email' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up first.' });
        }

        // Generate mock OTP
        const otp = '123456';
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        console.log(`[LOGIN] OTP for ${email}: ${otp}`);

        res.status(200).json({
            message: 'OTP sent successfully',
            // In production, don't send OTP in response. For dev/assignment, it's helpful.
            debug_otp: otp
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP and get token
// @route   POST /api/auth/verify
// @access  Public
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({
            _id: user.id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
