import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { ICreateUser } from '../../types/User';
import { Users } from '../../user/models/Users.model';
import { UserService } from '../../user/services/user.service';
import { IsPublic } from '../decorators/IsPublic.decorator';
import { UserToken } from '../models/UserToken.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('signup')
  async createUser(
    @Body() user: ICreateUser,
    @Response() res,
  ): Promise<UserToken> {
    try {
      const pass = user.password;
      const newUser = await this.authService.createUser(user);
      newUser.password = pass;
      const loggedUser = await this.authService.login(newUser);
      return res.status(HttpStatus.CREATED).json(loggedUser);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @IsPublic()
  @Post('signin')
  async login(@Body() userToLogin: Users, @Response() res): Promise<UserToken> {
    try {
      const jwt = await this.authService.login(userToLogin);
      return res.status(HttpStatus.OK).json(jwt);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
