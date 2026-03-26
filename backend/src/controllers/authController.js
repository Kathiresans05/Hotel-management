const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Helper to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Demo accounts for all roles (work without MongoDB)
const DEMO_ACCOUNTS = {
    'admin@hostel.com':    { password: 'admin123', name: 'Super Admin (Demo)', role: 'super_admin' },
    'subadmin@hostel.com': { password: 'sub123',   name: 'Sub Admin (Demo)',   role: 'sub_admin' },
    'reception@hostel.com':{ password: 'rec123',   name: 'Reception (Demo)',   role: 'reception' },
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();
        const normalizedPassword = password?.trim();

        // DEMO MODE: Check all demo accounts first (works without MongoDB)
        const demoUser = DEMO_ACCOUNTS[normalizedEmail];
        if (demoUser && demoUser.password === normalizedPassword) {
            console.log(`[DEMO MODE] OTP for ${normalizedEmail}: 123456`);
            return res.json({ message: 'OTP sent to your email (Demo Mode)', email: normalizedEmail });
        }

        // Check if database is connected for non-demo accounts
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                message: 'Internal Database is offline. Please use Demo Credentials:\n• admin@hostel.com / admin123 (Super Admin)\n• subadmin@hostel.com / sub123 (Sub Admin)\n• reception@hostel.com / rec123 (Reception)'
            });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // In a real app, send OTP via email/SMS here
        console.log(`OTP for ${user.email}: ${otp}`);

        res.json({ message: 'OTP sent to your email', email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();
        const normalizedOtp = otp?.toString().trim();

        console.log(`[DEBUG] Verifying OTP for ${normalizedEmail}. Input: ${normalizedOtp}`);

        // UNIVERSAL DEMO OTP: Allow 123456 for any demo account
        if (normalizedOtp === '123456') {
            console.log(`[DEBUG] Demo OTP match for ${normalizedEmail}`);
            let user;

            // Check if it's a known demo account
            const demoAccount = DEMO_ACCOUNTS[normalizedEmail];
            if (demoAccount) {
                user = {
                    id: `demo_${demoAccount.role}_id`,
                    name: demoAccount.name,
                    email: normalizedEmail,
                    role: demoAccount.role,
                    permissions: ['all']
                };
            } else {
                // Try to find the actual user in DB
                try {
                    const dbUser = await User.findOne({ email: normalizedEmail });
                    if (dbUser) {
                        user = {
                            id: dbUser._id,
                            name: dbUser.name,
                            email: dbUser.email,
                            role: dbUser.role,
                            permissions: dbUser.permissions || []
                        };
                    }
                } catch (_) { /* DB not available */ }
            }

            if (user) {
                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET || 'secret123',
                    { expiresIn: '1d' }
                );
                return res.json({ token, user });
            }
        }

        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ 
                message: 'Database is offline. Please use the Demo Code (123456).' 
            });
        }

        const user = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP after verification
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.lastLogin = Date.now();
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        // Demo user - return from req.user directly (no DB lookup needed)
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.json(req.user);
        }
        // Real user - fetch from DB
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
