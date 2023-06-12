import { Op } from 'sequelize';
import { Service } from 'typedi';

import Booking from '../models/Booking';

@Service()
export default class BookingRepository {
  createBooking = async (
    createdBy: string,
    startTime: Date,
    endTime: Date,
    parkingSpotId: number,
  ): Promise<Booking> => {
    const booking = Booking.build({ createdBy, startTime, endTime, parkingSpotId });
    const result = await booking.save();

    return result;
  };

  findByBookingId = async (bookingId: number): Promise<Booking | null> => {
    return await Booking.findOne({ where: { id: bookingId } });
  };

  getAllBookings = async (): Promise<Booking[]> => {
    return await Booking.findAll();
  };

  isTimeElapsed = (booking: Booking, currentTime: Date): boolean => {
    return booking.startTime <= currentTime && booking.endTime <= currentTime;
  };

  findLatestBookingStatus = async (parkingSpotId: number): Promise<boolean> => {
    const currentTime = new Date();
  
    const latestBooking = await Booking.findOne({
      where: {
        parkingSpotId: parkingSpotId,
        endTime: {
          [Op.gte]: currentTime,
        },
      },
      order: [['startTime', 'DESC']],
    });
  
    if (!latestBooking) {
      return true;
    }
  
    return false;
  };

  getInactiveBookings = async (): Promise<Booking[]> => {
    const currentTime = new Date();

    return await Booking.findAll({
      where: {
        endTime: {
          [Op.lt]: currentTime, // Find bookings where endTime is less than current time
        },
      },
    });
  };

  getActiveBookings = async (): Promise<Booking[]> => {
    const currentTime = new Date();
    return await Booking.findAll({
      where: {
        startTime: {
          [Op.gt]: currentTime, // Find bookings where endTime is less than current time
        },
      },
    });
  };

  updateBookingById = async (bookingId: number, updatedBookingData: Partial<Booking>): Promise<number> => {
    const [affectedCount] = await Booking.update(updatedBookingData, { where: { id: bookingId } });
    return affectedCount;
  };

  deleteBookingById = async (bookingId: number): Promise<number> => {
    return await Booking.destroy({ where: { id: bookingId } });
  };
}
