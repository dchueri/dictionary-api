import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/user/models/Users.model';

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
}
