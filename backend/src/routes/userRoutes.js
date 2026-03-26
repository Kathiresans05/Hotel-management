const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

// For now, we are not adding authMiddleware to simplify testing for the user
// In a real app, these would be protected
router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
