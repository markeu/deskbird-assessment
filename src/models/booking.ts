import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import ParkingSpot from './parkSpot';

@Table({ tableName: 'bookings' })
export default class Booking extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    createdBy!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startTime!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    endTime!: Date;

    @ForeignKey(() => ParkingSpot)
    @Column({
        allowNull: false,
    })
    parkingSpotId!: number;

    @BelongsTo(() => ParkingSpot)
    parkingSpot: ParkingSpot;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;
}
