require("es6-promise").polyfill();
const axios = require("axios");
const db = require("../models");
const bcrypt = require("bcrypt");
const md5 = require('md5');
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
      //let wordsArray = await getWordsArray();
      let wordsArray = ["teste", "casa", "moto"];
      const hash = md5(wordsArray.join());

      //let wordsArray = ["teste", "casa", "moto"];
      let atualHash = await WordsListRepository.getAtualHash();
      const isNewList = await WordsListServices.verifyIfHasNewList(
        wordsArray.join(),
        atualHash
      );
      const newHash = await WordsListRepository.createHash(wordsArray)
      console.log(atualHash);
      console.log(newHash.hash)
      console.log('result', atualHash == newHash);
      if (!isNewList) {
        console.log("All up to date");
      } else {
        console.log(
          await WordsListServices.verifyIfHasNewList(
            wordsArray.join("\n"),
            atualHash
          )
        );
        await WordsListRepository.clearTable();
        console.log("Starting the addition of words in DB");
        //wordsArray = wordsArray.pop();
        WordsListRepository.createWordsList(wordsArray);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = WordsImport;
