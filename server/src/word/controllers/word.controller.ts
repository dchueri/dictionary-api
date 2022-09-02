import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Response
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../dto/pagination-options.dto';
import { WordService } from '../services/word.service';

@ApiTags('entries')
@Controller('entries/en')
export class WordController {
  constructor(private wordService: WordService) {}
  @Post(':word/favorite')
  async addWordToFavorites(
    @Param('word') word: string,
    @Body('userId') userId: number,
    @Response() res,
  ) {
    try {
      const wordId = await this.wordService.getIdByWord(word);
      await this.wordService.addWordToFavorites(wordId, userId);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Word added to your favorites' });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Delete(':word/unfavorite')
  async removeWordOfFavorites(
    @Param('word') word: string,
    @Body('userId') userId: number,
    @Response() res,
  ) {
    try {
      const wordId = await this.wordService.getIdByWord(word);
      await this.wordService.removeWordToFavorites(wordId, userId);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Word removed from your favorites' });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Get(':word')
  async findWord(
    @Param('word') word: string,
    @Body('userId') userId: number,
    @Response() res,
  ) {
    try {
      const wordId = await this.wordService.getIdByWord(word);
      const result = await this.wordService.getWordInfos(word);
      await this.wordService.addWordToHistoric(wordId, userId);
      return res.status(HttpStatus.OK).json(result.data[0]);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Get()
  async getAllWords(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Response() res,
  ): Promise<any> {
    try {
      const paginationOptions = new PaginationOptionsDto();
      paginationOptions.search = search;
      paginationOptions.limit = parseInt(limit);
      paginationOptions.page = parseInt(page);
      const wordsList = await this.wordService.getWordsListPaginated(
        paginationOptions,
      );
      return res.status(HttpStatus.OK).json(wordsList);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
