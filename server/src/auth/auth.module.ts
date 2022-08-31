import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Historic } from 'src/user/models/Historic.model';
import { Users } from 'src/user/models/Users.model';
import { UserService } from 'src/user/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [SequelizeModule.forFeature([Users, Historic])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
