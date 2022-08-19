import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { WordService } from '../services/word.service';

@Controller('entries/en')
export class WordController {
  constructor(private wordService: WordService) {}
  @Post(':word/favorite')
  async addWordToFavorites(
    @Param('word') word: string,
    @Body('userId') userId: number,
  ) {
    const wordId = await this.wordService.getIdByWord(word);
    await this.wordService.addWordToFavorites(wordId, userId);
  }

  @Delete(':word/unfavorite')
  async removeWordOfFavorites(
    @Param('word') word: string,
    @Body('userId') userId: number,
  ) {
    const wordId = await this.wordService.getIdByWord(word);
    await this.wordService.removeWordToFavorites(wordId, userId);
  }
}
