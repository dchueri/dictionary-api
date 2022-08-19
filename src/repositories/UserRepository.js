const db = require("../models");
const WordRepository = require("./WordRepository");

const usersDB = db.Users;

class UserRepository {
  static async addFavoriteWord(wordToAdd, userId) {
    const user = await this.findUserById(userId);
    const wordId = await WordRepository.findIdByWord(wordToAdd);
    user.addWord(wordId);
  }

  static async removeFavoriteWord(wordToRemove, userId) {
    const user = await this.findUserById(userId);
    const wordId = await WordRepository.findIdByWord(wordToRemove);
    user.removeWord(wordId);
  }

  static async findFavoritesOfUser(userId) {
    const allFavoritesWords = await usersDB.findOne({
      attributes: ["favorites"],
      includes: [
        {
          model: usersDB,
          attributes: ["favorites"],
        },
      ],
      where: {
        id: userId,
      },
      raw: true,
    });
    return allFavoritesWords.favorites;
  }

  static async findUserById(id, attributesOfReturn) {
    return usersDB.findOne({
      where: { id: id },
      attributes: attributesOfReturn,
    });
  }
}

module.exports = UserRepository;
