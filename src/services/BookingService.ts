import { Service } from 'typedi';

import { LoggerClient } from './LoggerClient';
import BookingRepository from '../repositories/BookingRepository';
import { ApplicationError } from '../utils/ApiError';
@Service()
export default class BookingService {
  constructor(public bookingRepository: BookingRepository, public logger: LoggerClient) {}

  createParkingSpotBooking = async (startTime: Date, endTime: Date, parkingSpotId: number, createdBy: string) => {
    const currentTime = new Date().getTime();
    const startDateTime = new Date(startTime).getTime();

    if (startDateTime < currentTime) {
      throw new ApplicationError('Booking start time must not be in the past');
    }

    const parkingSpotAvailability = await this.bookingRepository.findLatestBookingStatus(parkingSpotId);

    if (!parkingSpotAvailability) {
      throw new ApplicationError('Parking spot currently occupied');
    }

    const newBooking = await this.bookingRepository.createBooking(createdBy, startTime, endTime, parkingSpotId);
    return newBooking;
  };

  // getParkingSpotByName = async (name: string) => {
  //     const result = await this.parkingSpotRepository.findByName(name);
  //     return result;
  // }

  // getAllParkinSpot = async () => {
  //     const result = await this.parkingSpotRepository.getAllParkSpot();
  //     return result;
  // };
}
