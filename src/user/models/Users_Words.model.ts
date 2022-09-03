import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Words } from '../../word/models/Words.model';
import { Users } from './Users.model';

@Table
export class Users_Words extends Model {
  @ForeignKey(() => Users)
  @Column
  userId: number;
  @ForeignKey(() => Words)
  @Column
  wordId: number;
}
