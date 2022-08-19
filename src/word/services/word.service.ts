import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

  async addWordToFavorites(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$add('favoritesWords', wordId);
  }

  async removeWordToFavorites(wordId: number, userId: number) {
    const user = await this.userModel.findByPk(userId);
    user.$remove('favoritesWords', wordId);
  }

  async getIdByWord(word: string): Promise<number> {
    const wordId = await this.wordModel.findOne({ where: { word: word } });
    return wordId.id;
  }
}
