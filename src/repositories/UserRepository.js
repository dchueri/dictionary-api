const Repository = require("./Repository");
const db = require("../models");

class UserRepository extends Repository {
  static async addFavoriteWord(wordToAdd, userId) {
    const allFavoritesWords = await this.findFavoritesOfUser(userId);
    let newFavoriteList;
    if(allFavoritesWords == null) {
        newFavoriteList = wordToAdd + "\n";
    } else {
        newFavoriteList = allFavoritesWords + wordToAdd + "\n";
    }
    await db.Users.update(
      { favorites: newFavoriteList },
      { where: { id: userId } }
    );
  }

  static async removeFavoriteWord(wordToRemove, userId) {
    const allFavoritesWords = await this.findFavoritesOfUser(userId);
    const favoriteListArray = allFavoritesWords.split("\n");
    const indexOfWordToRemove = favoriteListArray.indexOf(wordToRemove);
    if(indexOfWordToRemove === -1) {
      throw new Error("The selected word is not in this user favorites")
    }
    favoriteListArray.splice(indexOfWordToRemove, 1);
    const newFavoriteList = favoriteListArray.join("\n")
    await db.Users.update(
      { favorites: newFavoriteList },
      { where: { id: userId } }
    );
  }

  static async findFavoritesOfUser(userId) {
    const allFavoritesWords = await db.Users.findOne({
      attributes: ["favorites"],
      includes: [
        {
          model: db.Users,
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
}

module.exports = UserRepository;
