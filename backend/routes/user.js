const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users/profile/:id
router.get('/profile/:id', userController.getProfile);

// GET /api/users/workers
router.get('/workers', userController.listWorkers);

module.exports = router; 