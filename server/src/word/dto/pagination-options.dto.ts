import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, MaxLength, Min } from 'class-validator';

export class PaginationOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  @MaxLength(25)
  @Type(() => String)
  search?: string = null;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
