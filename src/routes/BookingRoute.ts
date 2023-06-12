import express from 'express';
import { Container } from 'typedi';

import BookingController from '../controllers/BookingController';
import { authMiddleware } from '../middlewares/authorizationHandler';
const router = express.Router();

/**
 * We are using TypeDI to get the Booking instance from our dependency container
 */
const bookingController = Container.get(BookingController);

router.post('/', authMiddleware, bookingController.createBooking);

export default router;
