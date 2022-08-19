const bcrypt = require("bcrypt");

class WordsListServices {
  static async verifyIfHasNewList(wordsList, hash) {
    if (!hash) {
      return true;
    }
    const isHashEqual = md5(wordsList) === hash;
    return !isHashEqual;
  }
}

module.exports = WordsListServices;
