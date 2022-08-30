import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/user/models/Users.model';
import UserNotFoundException from '../errors/user-not-found.error';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}
  async getUserById(userId: number): Promise<Users> {
    const userFound = await this.userModel.findByPk(userId);
    return userFound;
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
}
