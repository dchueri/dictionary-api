require("es6-promise").polyfill();
const axios = require("axios");
const { md5 } = require("../utils/md5");
const WordsListRepository = require("../repositories/WordsListRepository");

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
      const atualHash = await WordsListRepository.getAtualHash();
      if (atualHash === hashOfNewArray) {
        console.log("All up to date");
      } else {
        await WordsListRepository.clearTable();
        console.log("Starting the addition of words in DB");
        await WordsListRepository.createWordsList(wordsArray);
        await WordsListRepository.createHash(hashOfNewArray);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = WordsImport;
