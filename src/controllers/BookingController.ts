import { Request } from 'express';
import { Service } from 'typedi';

import { asyncWrapper } from '../utils/asyncWrapper';
import BookingService from '../services/BookingService';
import { SuccessResponse } from '../utils/SuccessResponse';

@Service()
export default class BookingController {
    constructor(public bookingService: BookingService) { }

    seedParkingSpot = asyncWrapper(async (req: Request) => {
        const response = await this.bookingService.createParkingSpotBooking(req.body.startTime, req.body.endTime, req.body.parkingSpotId, req.user.email)
        return new SuccessResponse(response);
    })


}
