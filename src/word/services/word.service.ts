import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Users } from 'src/user/models/Users.model';
import { Words } from '../models/Words.model';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Words)
    private wordModel: typeof Words,
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async getWordListArray() {
    const res = await axios.get(
      'https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt',
    );
    const data = res.data;
    return data.split('\n');
  }

  async addWordToFavorites(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$add('favoritesWords', wordId);
  }

  async removeWordToFavorites(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$remove('favoritesWords', wordId);
  }

  async addWordToHistoric(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$add('historic', wordId);
  }

  async removeWordToHistoric(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$remove('historic', wordId);
  }

  async getIdByWord(word: string): Promise<number> {
    const wordId = await this.wordModel.findOne({ where: { word: word } });
    return wordId.id;
  }

  async getAllWords() {
    const words = await this.wordModel.findAll();
    return words;
  }

  async clearTable() {
    await this.wordModel.destroy({
      where: {},
      truncate: false,
    });
  }

  async createWordsList(wordsArray: string[]) {
    const listAdded = await this.wordModel.bulkCreate(
      wordsArray.map((word) => ({
        word: word,
      })),
    );
    return console.log(`Words list created with ${listAdded.length} words.`);
  }
}
