import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/user/models/Users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}
  async createUser(userToCreate): Promise<Users> {
    const newUser = this.userModel.create(userToCreate);
    return newUser;
  }
}
