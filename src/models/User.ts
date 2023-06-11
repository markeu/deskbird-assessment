import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'standard',
  })
  role!: string;
}
