const Repository = require("./Repository");
const db = require("../models");

class UserRepository extends Repository {
  static async addFavoriteWord(word, userId) {
    const allFavoritesWords = await this.findFavoritesOfUser(userId);
    let newFavoriteList;
    if(allFavoritesWords == null) {
        newFavoriteList = word + "\n";
    } else {
        newFavoriteList = allFavoritesWords + word + "\n";
    }
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
