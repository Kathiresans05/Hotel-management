const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
const seedData = async () => {
    try {
        await connectDB();
        await User.deleteMany();

        const admin = await User.create({
            name: 'Super Admin',
            email: 'admin@hostel.com',
            password: 'admin123',
            phone: '1234567890',
            role: 'super_admin',
            status: 'active'
        });

        const kavi = await User.create({
            name: 'Kavi',
            email: 'kavi@gmail.com',
            password: '123123',
            phone: '9876543210',
            role: 'reception',
            status: 'active'
        });

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
