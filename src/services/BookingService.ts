import { Service } from 'typedi';

import { LoggerClient } from './LoggerClient';
import BookingRepository from '../repositories/BookingRepository';
import { decodeToken } from '../utils/decipherToken';
import { ApplicationError } from '../utils/ApiError';
@Service()
export default class BookingService {
  constructor(public bookingRepository: BookingRepository, public logger: LoggerClient) {}

  createParkingSpotBooking = async (startTime: Date, endTime: Date, parkingSpotId: number, token: string) => {
    const parkingSpotAvailability = await this.bookingRepository.findLatestBookingStatus(parkingSpotId);

    if (!parkingSpotAvailability) {
      throw new ApplicationError('Parking spot currently occupied !!');
    }

    const tokenData = decodeToken(token);

    if (!tokenData || !tokenData.email) {
      throw new ApplicationError('Invalid token !!');
    }

    const newBooking = await this.bookingRepository.createBooking(tokenData.email, startTime, endTime, parkingSpotId);
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
