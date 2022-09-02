import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../../user/models/Users.model';
import { PaginationOptionsDto } from '../../word/dto/pagination-options.dto';
import { PageDto } from '../../word/dto/pagination.dto';
import UserNotFoundException from '../errors/user-not-found.error';
import { Historic } from '../models/Historic.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(Historic)
    private historicModel: typeof Historic,
  ) {}
  async getUserById(userId: number): Promise<any> {
    const userFound = await this.userModel.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    const user = userFound;
    return user;
  }

  async getAllUsers(): Promise<Users[]> {
    const usersFound = await this.userModel.findAll();
    return usersFound;
  }

  async findByEmail(email: string) {
    const userFound = await this.userModel.findOne({
      where: { email: email },
    });
    if (userFound) {
      return userFound;
    }
    throw new UserNotFoundException(email);
  }

  async getUserHistoric(
    userId: number,
    paginationOptions: PaginationOptionsDto,
  ) {
    const user = await this.userModel.findByPk(userId);
    const historic = await user.$get('searchHistory', {
      attributes: ['word', ['createdAt', 'added']],
      limit: paginationOptions.limit,
    });
    const count = await user.$count('searchHistory');
    const array = [];
    let index = 0;
    if (count < paginationOptions.limit) {
      index = count;
    } else {
      index = paginationOptions.limit;
    }
    for (let i = 0; i < index; i++) {
      const obj = {
        word: historic[i].dataValues.word,
        added: historic[i].dataValues.added,
      };
      array.push(obj);
    }
    const result = new PageDto(array, paginationOptions, count);
    return result;
  }

  async getUserFavorites(
    userId: number,
    paginationOptions: PaginationOptionsDto,
  ) {
    const user = await this.userModel.findByPk(userId);
    const historic = await user.$get('favoritesWords', {
      attributes: ['word', ['createdAt', 'added']],
      limit: paginationOptions.limit,
    });
    const count = await user.$count('favoritesWords');
    const array = [];
    let index = 0;
    if (count < paginationOptions.limit) {
      index = count;
    } else {
      index = paginationOptions.limit;
    }
    for (let i = 0; i < index; i++) {
      const obj = {
        word: historic[i].dataValues.word,
        added: historic[i].dataValues.added,
      };
      array.push(obj);
    }
    const result = new PageDto(array, paginationOptions, count);
    return result;
  }
}
