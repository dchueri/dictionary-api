import { IsArray } from 'class-validator';
import { PaginationOptionsDto } from './pagination-options.dto';

export class PageDto<T> {
  @IsArray()
  readonly results: T[];

  readonly page: number;

  readonly limit: number;

  readonly totalDocs: number;

  readonly totalPages: number;

  readonly hasNext: boolean;

  readonly hasPrev: boolean;

  constructor(
    results: T[],
    paginationOptions: PaginationOptionsDto,
    totalDocs: number,
  ) {
    this.results = results;
    this.page = paginationOptions.page;
    this.limit = paginationOptions.limit;
    this.totalDocs = totalDocs;
    this.totalPages = Math.ceil(this.totalDocs / this.limit);
    this.hasNext = this.page > 1;
    this.hasPrev = this.page < this.totalPages;
  }
}
