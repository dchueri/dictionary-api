import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { Words } from 'src/word/models/Words.model';
import { Historic } from './Historic.model';
import { Users_Words } from './Users_Words.model';

@Table
export class Users extends Model {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @BelongsToMany(() => Words, () => Users_Words)
  favoritesWords: Words;
  @BelongsToMany(() => Words, () => Historic)
  searchHistory: Words;
}
