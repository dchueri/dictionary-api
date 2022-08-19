import { Body, Controller, Get } from '@nestjs/common';
import { Users } from 'src/user/models/Users.model';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  async getUser(@Body('userId') userId: number): Promise<Users> {
    return await this.userService.getUserById(userId);
  }
}
