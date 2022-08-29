import { Body, Controller, Post } from '@nestjs/common';
import { ICreateUser } from 'src/types/User';
import { Users } from 'src/user/models/Users.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async createUser(@Body() user: ICreateUser): Promise<Users> {
    console.log(user);
    const newUser = await this.authService.createUser(user);
    return newUser;
  }
}
