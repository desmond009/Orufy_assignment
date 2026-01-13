const express = require('express');
const router = express.Router();
const { signupUser, loginUser, verifyOtp } = require('../controllers/authController');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/verify', verifyOtp);

module.exports = router;
