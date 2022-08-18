const db = require("../models");
const Repository = require("../repositories/Repository");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(db.Users);

class UserController {
  static async getUser(req, res) {
    const { userId } = req.body;
    const attributesForReturnOfSearch = [
      "id",
      "name",
      "email",
      "favorites",
      "historic",
    ];
    try {
      const me = await userRepository.findOneById(
        userId,
        attributesForReturnOfSearch
      );
      return res.status(200).json(me);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = req.body;
      const newUserCreated = await userRepository.create(newUser);
      return res.status(200).json(newUserCreated);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  static async addFavoriteWord(req, res) {
    try {
      const { word } = req.params;
      const { userId } = req.body;
      await userRepository.addFavoriteWord(word, userId);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  static async removeFavoriteWord(req, res) {
    try {
      const { word } = req.params;
      const { userId } = req.body;
      await userRepository.removeFavoriteWord(word, userId);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = UserController;
