const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/user/:id', UserController.getUser);
router.post('/auth/signup', UserController.createUser);
//router.get('/me', UserController.getAllUsers);
router.post('/entries/en/:word/favorite', UserController.addFavoriteWord)
router.delete('/entries/en/:word/unfavorite', UserController.removeFavoriteWord)

module.exports = router;