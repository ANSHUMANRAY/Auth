const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/validate', userController.validateToken);

module.exports = router;
