import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from 'src/user/controllers/user.controller';
import { Users } from 'src/user/models/Users.model';
import { Words } from 'src/word/models/Words.model';
import { Historic } from './models/Historic.model';
import { Users_Words } from './models/Users_Words.model';
import { UserService } from './services/user.service';

@Module({
  imports: [SequelizeModule.forFeature([Users, Words, Users_Words, Historic])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
