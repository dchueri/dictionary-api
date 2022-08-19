const db = require("../models");
const md5 = require("md5");
const { sequelize } = require("../models");

const wordsDB = db.Words;

class WordRepository {
  static async createWordsList(wordsList) {
    const listAdded = await wordsDB.bulkCreate(
      wordsList.map((word) => ({
        word: word,
      }))
    );
    return console.log(`Words list created with ${listAdded.length} words.`);
  }

  static async findIdByWord(word) {
    const foundWord = await wordsDB.findOne({
      where: { word: word },
    });
    return foundWord.dataValues.id;
  }

  static async createHash(hash) {
    const addedHash = await db.list_hashes.create({ hash });
    return addedHash;
  }

  static async getAtualHash() {
    const atualHash = await sequelize.query(
      "SELECT hash FROM list_hashes WHERE id = (SELECT MAX(id) FROM list_hashes)"
    );
    if (atualHash[0][0]) {
      return atualHash[0][0].hash;
    } else {
      return "1";
    }
  }

  static async clearTable() {
    wordsDB.destroy({
      where: {},
      truncate: true,
    });
  }
}

module.exports = WordRepository;
