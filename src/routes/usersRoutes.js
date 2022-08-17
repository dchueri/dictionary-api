const { Router } = require('express');
const routes = require('.');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/user/:id', UserController.getUser);
router.post('/auth/signup', UserController.createUser);
//router.get('/me', UserController.getAllUsers);

module.exports = router;