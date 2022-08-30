import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import UserAlreadyExistsException from 'src/user/errors/user-already-exists.error';
import { Users } from '../../user/models/Users.model';
import { UserService } from '../../user/services/user.service';
import { UserPayload } from '../models/UserPayload.model';
import { UserToken } from '../models/UserToken.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(userToCreate): Promise<Users> {
    if (userToCreate.name && userToCreate.password && userToCreate.email) {
      const verifyIfUserExists = await this.userModel.findOne({
        where: { email: userToCreate.email },
      });
      if (!verifyIfUserExists) {
        userToCreate.password = await this.hashPassword(userToCreate.password);
        return await this.userModel.create(userToCreate);
      }
      throw new UserAlreadyExistsException(userToCreate.email);
    }
    throw new BadRequestException('You must provide name, email and password.');
  }

  async validateUser(email: string, password: string): Promise<any> {
    if (email && password) {
      const user = await this.usersService.findByEmail(email);
      if (user) {
        const isValidPassword = await this.comparePassword(
          password,
          user.password,
        );
        if (isValidPassword) {
          return user;
        }
      }
      throw new Error('Email or password provided is incorrect.');
    }
    throw new Error('You must provide email and password.');
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async login(user: Users): Promise<UserToken> {
    const validatedUser = await this.validateUser(user.email, user.password);
    const payload: UserPayload = {
      sub: validatedUser.id,
      email: validatedUser.email,
    };

    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      id: validatedUser.id,
      name: validatedUser.name,
      access_token: jwtToken,
    };
  }
}
