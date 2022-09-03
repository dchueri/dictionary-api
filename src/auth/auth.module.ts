import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Historic } from '../user/models/Historic.model';
import { Users } from '../user/models/Users.model';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [SequelizeModule.forFeature([Users, Historic])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
