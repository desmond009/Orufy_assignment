const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    name: {
        type: String,
        default: 'User'
    },
    otp: String,
    otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
