import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { Users } from 'src/user/models/Users.model';
import { Users_Words } from 'src/user/models/Users_Words.model';
import { Historic } from '../../user/models/Historic.model';

@Table
export class Words extends Model {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  word: string;
  @ApiProperty()
  @BelongsToMany(() => Users, () => Users_Words)
  users: Users;
  @BelongsToMany(() => Users, () => Historic)
  searchHistory: Users;
}
