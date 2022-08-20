import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { Historic } from 'src/user/models/historic.model';
import { Users } from 'src/user/models/Users.model';
import { Users_Words } from 'src/user/models/Users_Words.model';

@Table
export class Words extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  word: string;
  @BelongsToMany(() => Users, () => Users_Words)
  users: Users;
  @BelongsToMany(() => Users, () => Historic)
  searchHistory: Users;
}
