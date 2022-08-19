require("es6-promise").polyfill();
const axios = require("axios");
const { md5 } = require("../utils/md5");
const WordRepository = require("../repositories/WordRepository");

async function getWordsArray() {
  const res = await axios.get(
    "https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt"
  );
  const data = res.data;
  return data.split("\n");
}

class WordsImport {
  static async insertWordsIntoDB() {
    try {
      let wordsArray = await getWordsArray();
      const hashOfNewArray = md5(wordsArray.join());
      const atualHash = await WordRepository.getAtualHash();
      if (atualHash === hashOfNewArray) {
        console.log("All up to date");
      } else {
        await WordRepository.clearTable();
        console.log("Starting the addition of words in DB");
        await WordRepository.createWordsList(wordsArray);
        await WordRepository.createHash(hashOfNewArray);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = WordsImport;
