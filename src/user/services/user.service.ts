import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/user/models/Users.model';
import { Words } from 'src/word/models/Words.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(Words)
    private wordModel: typeof Words,
  ) {}
  async getUserById(userId: number): Promise<Users> {
    const userFound = await this.userModel.findByPk(userId);
    return userFound;
  }

  async addWordToFavorites(wordId: number, userId: number) {
    const user = await this.getUserById(userId);
    user.$add('favoritesWords', wordId);
  }
}
