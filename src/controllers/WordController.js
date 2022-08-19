const UserRepository = require("../repositories/UserRepository");
const WordRepository = require("../repositories/WordRepository");

class WordController {
  static async addFavoriteWord(req, res) {
    try {
      const { word } = req.params;
      const { userId } = req.body;
      await UserRepository.addFavoriteWord(word, userId);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  static async removeFavoriteWord(req, res) {
    try {
      const { word } = req.params;
      const { userId } = req.body;
      await UserRepository.removeFavoriteWord(word, userId);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

module.exports = WordController;
