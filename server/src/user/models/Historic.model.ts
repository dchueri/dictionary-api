import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Words } from 'src/word/models/Words.model';
import { Users } from './Users.model';

@Table
export class Historic extends Model {
  @ForeignKey(() => Users)
  @Column
  userId: number;
  @ForeignKey(() => Words)
  @Column
  wordId: number;
}
