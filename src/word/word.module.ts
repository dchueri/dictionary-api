import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Historic } from 'src/user/models/historic.model';
import { Users } from 'src/user/models/Users.model';
import { Users_Words } from 'src/user/models/Users_Words.model';
import { WordController } from './controllers/word.controller';
import { Words } from './models/Words.model';
import { WordService } from './services/word.service';

@Module({
  imports: [SequelizeModule.forFeature([Users, Words, Users_Words, Historic])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
