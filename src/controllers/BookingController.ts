import { Request } from 'express';
import { Service } from 'typedi';

import { asyncWrapper } from '../utils/asyncWrapper';
import BookingService from '../services/BookingService';
import { SuccessResponse } from '../utils/SuccessResponse';

@Service()
export default class BookingController {
  constructor(public bookingService: BookingService) {}

  createBooking = asyncWrapper(async (req: Request) => {
    const response = await this.bookingService.createParkingSpotBooking(
      req.body.startTime,
      req.body.endTime,
      req.body.parkingSpotId,
      req.user.email,
    );
    return new SuccessResponse(response);
  });

  getBooking = asyncWrapper(async (req: Request) => {
    const response = await this.bookingService.getBookings(req.user.role, req.user.email);
    return new SuccessResponse(response);
  });

  updateBooking = asyncWrapper(async (req: Request) => {
    const bookingId = parseInt(req.query.bookingId as string, 10);

    const response = await this.bookingService.updateBooking(bookingId, req.body, req.user.role, req.user.email);
    return new SuccessResponse(response);
  });

  deleteBooking = asyncWrapper(async (req: Request) => {
    const bookingId = parseInt(req.query.bookingId as string, 10);

    const response = await this.bookingService.deleteBooking(bookingId, req.user.role, req.user.email);
    return new SuccessResponse(response);
  });
}
