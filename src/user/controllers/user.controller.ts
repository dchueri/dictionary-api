import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Response,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Users } from '../../user/models/Users.model';
import { PaginationOptionsDto } from '../../word/dto/pagination-options.dto';
import { UserService } from '../services/user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  async getUser(
    @Body('userId') userId: number,
    @Response() res,
  ): Promise<Users> {
    const user = await this.userService.getUserById(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('me/history')
  async getUserHistoric(
    @Body('userId') userId: number,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Response() res,
  ): Promise<Users> {
    try {
      const paginationOptions = new PaginationOptionsDto();
      if (!page) {
        page = '1';
      }
      if (!limit) {
        limit = '10';
      }
      paginationOptions.limit = parseInt(limit);
      paginationOptions.page = parseInt(page);
      const user = await this.userService.getUserHistoric(
        userId,
        paginationOptions,
      );
      return res.status(HttpStatus.OK).json(user);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Get('me/favorites')
  async getUserFavorites(
    @Body('userId') userId: number,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Response() res,
  ): Promise<Users> {
    try {
      const paginationOptions = new PaginationOptionsDto();
      if (!page) {
        page = '1';
      }
      if (!limit) {
        limit = '10';
      }
      paginationOptions.limit = parseInt(limit);
      paginationOptions.page = parseInt(page);
      const user = await this.userService.getUserFavorites(
        userId,
        paginationOptions,
      );
      return res.status(HttpStatus.OK).json(user);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<Users[]> {
    return await this.userService.getAllUsers();
  }
}
