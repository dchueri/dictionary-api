require("es6-promise").polyfill();
const axios = require("axios");
const db = require("../models");
const WordsListRepository = require("../repositories/WordsListRepository");
const WordsListServices = require("../services/WordsListServices");

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
      let atualHash = await WordsListRepository.getAtualHash();
      if(WordsListServices.verifyIfHasNewList(wordsArray, atualHash)) {
        console.log("All up to date");
      } else {
        console.log(WordsListServices.verifyIfHasNewList(wordsArray, atualHash))
        /* await WordsListRepository.clearTable();
        console.log("Starting the addition of words in DB");
        wordsArray = wordsArray.filter((word) => word !== "");
        WordsListRepository.createWordsList(wordsArray); */
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = WordsImport;
