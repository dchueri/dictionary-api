import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Op } from 'sequelize';
import { Users } from 'src/user/models/Users.model';
import { PaginationOptionsDto } from '../dto/pagination-options.dto';
import { PageDto } from '../dto/pagination.dto';
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
    user.$add('searchHistory', wordId);
  }

  async removeWordToHistoric(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$remove('searchHistory', wordId);
  }

  async getIdByWord(word: string): Promise<number> {
    try {
      const wordId = await this.wordModel.findOne({ where: { word: word } });
      return wordId.id;
    } catch (e) {
      throw new Error('No Definitions Found');
    }
  }

  async getAllWords() {
    const words = await this.wordModel.findAll();
    return words;
  }

  async getWordsListPaginated(paginationOptions: PaginationOptionsDto) {
    const words = await this.wordModel.findAndCountAll({
      where: { word: { [Op.like]: `${paginationOptions.search}%` } },
      offset: paginationOptions.page,
      limit: paginationOptions.limit,
      attributes: ['word'],
    });
    const array = [];
    words.rows.map((word) => array.push(word.word));
    return new PageDto(array, paginationOptions, words.count);
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

  async getWordInfos(word: string) {
    const infosOfWord = await axios.get(
      'https://api.dictionaryapi.dev/api/v2/entries/en/' + word,
    );
    return infosOfWord;
  }
}
