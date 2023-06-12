import { Service } from 'typedi';

import { LoggerClient } from './LoggerClient';
import BookingRepository from '../repositories/BookingRepository';
import { ApplicationError } from '../utils/ApiError';
import Booking from '../models/Booking';
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

  getBookings = async (role: string, email: string) => {
    let result;

    //put the constant away
    if (role === 'admin') {
      result = await this.bookingRepository.getAllBookings();
    } else {
      result = await this.bookingRepository.getAllUserBookings(email);
    }

    return result;
  };

  updateBooking = async (
    bookingId: number,
    updatedBookingData: Partial<Booking>,
    userRole: string,
    userEmail: string,
  ) => {
    const booking = await this.bookingRepository.findByBookingId(bookingId);

    if (!booking) {
      throw new ApplicationError('Booking not found');
    }

    if (userRole === 'admin') {
      const updatedBooking = await this.bookingRepository.updateBookingById(bookingId, updatedBookingData);
      return updatedBooking;
    }

    if (booking.createdBy !== userEmail) {
      throw new ApplicationError('You can only update your own bookings');
    }

    const updatedBooking = await this.bookingRepository.updateBookingById(bookingId, updatedBookingData);
    return updatedBooking;
  };

  deleteBooking = async (bookingId: number, userRole: string, userEmail: string) => {
    const booking = await this.bookingRepository.findByBookingId(bookingId);

    if (!booking) {
      throw new ApplicationError('Booking not found');
    }

    if (userRole === 'admin') {
      await this.bookingRepository.deleteBookingById(bookingId);
      return 'Booking deleted successfully';
    }

    if (booking.createdBy !== userEmail) {
      throw new ApplicationError('You can only delete your own bookings');
    }

    await this.bookingRepository.deleteBookingById(bookingId);
    return 'Booking deleted successfully';
  };
}
