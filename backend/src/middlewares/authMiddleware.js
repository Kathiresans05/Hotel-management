const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const DEMO_USER_NAMES = {
    'super_admin': 'Super Admin (Demo)',
    'sub_admin': 'Sub Admin (Demo)',
    'reception': 'Reception (Demo)',
};

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            // Check if it's a demo ID (not a valid MongoDB ObjectId)
            const isValidObjectId = mongoose.Types.ObjectId.isValid(decoded.id);
            if (!isValidObjectId) {
                // Demo user - build user object from JWT claims directly
                req.user = {
                    _id: decoded.id,
                    id: decoded.id,
                    role: decoded.role,
                    name: DEMO_USER_NAMES[decoded.role] || 'Demo User',
                    email: 'demo@hostel.com',
                    permissions: ['all']
                };
                return next();
            }

            // Real user - fetch from DB
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};
