const Repository = require("./Repository");
const db = require("../models");
const bcrypt = require("bcrypt");
const { sequelize } = require("../models");

class WordsListRepository extends Repository {
  static async createWordsList(wordsList) {
    const listAdded = await db.Words.bulkCreate(
      wordsList.map((word) => ({
        word: word,
      }))
    )
    await this.createHashForList(listAdded);
    return console.log(`Words list created with ${listAdded.length} words.`);
  }

  static async createHashForList(list) {
    const hash = await bcrypt.hash(list.join(), 0);
    console.log(hash)
    const addedHash = await db.list_hashes.create({hash});
    return addedHash;
  }

  static async getAtualHash() {
    const atualHash = await sequelize.query('SELECT hash FROM list_hashes WHERE id = (SELECT MAX(id) FROM list_hashes)');
    if(atualHash[0][0]) {
        return atualHash[0][0].hash;
    } else {
        return '';
    }
  }

  static async clearTable() {
    db.Words.destroy({
        where: {},
        truncate: true
    })
  }
}

module.exports = WordsListRepository;
