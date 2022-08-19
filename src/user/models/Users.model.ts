import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { Words } from 'src/word/models/Words.model';
import { Users_Words } from './Users_Words.model';

@Table
export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @BelongsToMany(() => Words, () => Users_Words)
  favoritesWords: Words[];
}
