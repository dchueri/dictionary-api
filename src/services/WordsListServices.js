const bcrypt = require("bcrypt");

class WordsListServices {
  static async verifyIfHasNewList(wordsList, hash) {
    if (hash && bcrypt.compare(wordsList.join(), hash)) {
      return true;
    } else {
      return false;
    }
  }


}

module.exports = WordsListServices
