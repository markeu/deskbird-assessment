
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'parkingSpots' })
export default class ParkingSpot extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}