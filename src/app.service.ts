import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { WordService } from './word/services/word.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly wordService: WordService) {}
  async onApplicationBootstrap(): Promise<any> {
    const hasWordList = await this.wordService.getAllWords();
    let wordsArray = [];
    if (!hasWordList.length) {
      wordsArray = await this.wordService.getWordListArray();
      await this.wordService.createWordsList(wordsArray);
    } else {
      console.log(hasWordList.length + ' words in database');
      console.log('All up to date');
    }
  }
}
