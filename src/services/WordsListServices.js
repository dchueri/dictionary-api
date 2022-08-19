const bcrypt = require("bcrypt");

class WordsListServices {
  static async verifyIfHasNewList(wordsList, hash) {
    if (!hash) {
      return true;
    }
    const isHashEqual = await bcrypt.compare(wordsList, hash);
    return !isHashEqual;
  }
}

module.exports = WordsListServices;
