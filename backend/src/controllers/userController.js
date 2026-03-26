const User = require('../models/User');

// @desc    Get all users (Staff)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        // Fetch all users except the one currently logged in (optional) 
        // usually we filter by roles that consider "staff"
        const users = await User.find({ 
            role: { $in: ['sub_admin', 'reception'] } 
        }).select('-password');
        
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role, shift } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password, // Password will be hashed by the pre-save hook in User model
            phone,
            role: role === 'Super Admin' ? 'super_admin' : (role === 'Sub Admin' ? 'sub_admin' : 'reception'),
            status: 'active'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                joined: user.createdAt
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
