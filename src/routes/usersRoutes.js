const { Router } = require("express");
const UserController = require("../controllers/UserController");
const WordController = require("../controllers/WordController");

const router = Router();

router.get("/user/:id", UserController.getUser);
router.post("/auth/signup", UserController.createUser);
//router.get('/me', UserController.getAllUsers);
router.post("/entries/en/:word/favorite", WordController.addFavoriteWord);
router.delete(
  "/entries/en/:word/unfavorite",
  WordController.removeFavoriteWord
);

module.exports = router;
