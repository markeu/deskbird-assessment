import { ApplicationError } from '../src/utils/ApiError';
import BookingService from '../src/services/BookingService';
import { LoggerClient } from '../src/services/LoggerClient';
import BookingRepository from '../src/repositories/BookingRepository';


const bookingRepositoryMock: jest.Mocked<BookingRepository> = {
    getAllBookings: jest.fn(),
    getAllUserBookings: jest.fn(),
    findByBookingId: jest.fn(),
    updateBookingById: jest.fn(),
    deleteBookingById: jest.fn(),
    createBooking: jest.fn(),
    findLatestBookingStatus: jest.fn(),
    getActiveBookings: jest.fn(),
    getInactiveBookings: jest.fn(),
    isTimeElapsed: jest.fn()
};

let loggerMock: jest.Mocked<LoggerClient>;

describe('BookingService', () => {
    let bookingService: BookingService;

    beforeEach(() => {
        loggerMock = new LoggerClient() as jest.Mocked<LoggerClient>;
        bookingService = new BookingService(bookingRepositoryMock, loggerMock);
    });

    describe('createParkingSpotBooking', () => {
        it('should create a new booking if all conditions are met', async () => {

            const startTime = new Date();
            const endTime = new Date();
            const parkingSpotId = 1;
            const createdBy = 'user@example.com';
            const newBooking = { id: 1, startTime, endTime, parkingSpotId, createdBy };

            bookingRepositoryMock.findLatestBookingStatus = jest.fn().mockResolvedValue(true);
            bookingRepositoryMock.createBooking = jest.fn().mockResolvedValue(newBooking);

            const result = await bookingService.createParkingSpotBooking(startTime, endTime, parkingSpotId, createdBy);

            expect(result).toEqual(newBooking);
        });

        it('should throw an error if the start time is in the past', async () => {

            const startTime = new Date('2022-01-01');
            const endTime = new Date();
            const parkingSpotId = 1;
            const createdBy = 'user@example.com';

            await expect(
                bookingService.createParkingSpotBooking(startTime, endTime, parkingSpotId, createdBy)
            ).rejects.toThrow(ApplicationError);
        });

        it('should throw an error if the parking spot is currently occupied', async () => {
            const startTime = new Date("2023-08-12T11:00:00");
            const endTime = new Date("2023-08-12T13:27:00");
            const parkingSpotId = 1;
            const createdBy = 'user@example.com';

            bookingRepositoryMock.findLatestBookingStatus = jest.fn().mockResolvedValue(false);

            await expect(
                bookingService.createParkingSpotBooking(startTime, endTime, parkingSpotId, createdBy)
            ).rejects.toThrow(ApplicationError);
        });
    });

    describe('getBookings', () => {
        it('should get all bookings for an admin user', async () => {
            const role = 'admin';
            const email = 'admin@example.com';
            const bookings = [{ id: 1 }, { id: 2 }];

            bookingRepositoryMock.getAllBookings = jest.fn().mockResolvedValue(bookings);

            const result = await bookingService.getBookings(role, email);

            expect(result).toEqual(bookings);
        });

        it('should get user-specific bookings for a non-admin user', async () => {
            const role = 'user';
            const email = 'user@example.com';
            const bookings = [{ id: 1 }, { id: 2 }];

            bookingRepositoryMock.getAllUserBookings = jest.fn().mockResolvedValue(bookings);

            const result = await bookingService.getBookings(role, email);

            expect(result).toEqual(bookings);
        });

    });

    describe('updateBooking', () => {
        it('should update a booking for an admin user', async () => {
            const bookingId = 1;
            const updatedBookingData = { startTime: new Date() };
            const userRole = 'admin';
            const userEmail = 'admin@example.com';
            const updatedBooking = { id: 1, ...updatedBookingData };

            bookingRepositoryMock.findByBookingId = jest.fn().mockResolvedValue({ id: 1, createdBy: 'user@example.com' });
            bookingRepositoryMock.updateBookingById = jest.fn().mockResolvedValue(updatedBooking);

            const result = await bookingService.updateBooking(bookingId, updatedBookingData, userRole, userEmail);

            expect(result).toEqual(updatedBooking);
        });

        it('should throw an error if the booking does not exist', async () => {
            const bookingId = 1;
            const updatedBookingData = { startTime: new Date() };
            const userRole = 'user';
            const userEmail = 'user@example.com';

            bookingRepositoryMock.findByBookingId = jest.fn().mockResolvedValue(null);

            await expect(
                bookingService.updateBooking(bookingId, updatedBookingData, userRole, userEmail)
            ).rejects.toThrow(ApplicationError);
        });

        it('should throw an error if a non-admin user tries to update another user\'s booking', async () => {
            const bookingId = 1;
            const updatedBookingData = { startTime: new Date() };
            const userRole = 'user';
            const userEmail = 'user@example.com';

            bookingRepositoryMock.findByBookingId = jest.fn().mockResolvedValue({ id: 1, createdBy: 'otheruser@example.com' });

            await expect(
                bookingService.updateBooking(bookingId, updatedBookingData, userRole, userEmail)
            ).rejects.toThrow(ApplicationError);
        });

    });

    describe('deleteBooking', () => {
        it('should delete a booking for an admin user', async () => {
            const bookingId = 1;
            const userRole = 'admin';
            const userEmail = 'admin@example.com';

            bookingRepositoryMock.findByBookingId = jest.fn().mockResolvedValue({ id: 1, createdBy: 'user@example.com' });

            const result = await bookingService.deleteBooking(bookingId, userRole, userEmail);

            expect(result).toEqual('Booking deleted successfully');
            expect(bookingRepositoryMock.deleteBookingById).toHaveBeenCalledWith(bookingId);
        });

        it('should throw an error if the booking does not exist', async () => {
            const bookingId = 1;
            const userRole = 'user';
            const userEmail = 'user@example.com';

            bookingRepositoryMock.findByBookingId = jest.fn().mockResolvedValue(null);

            await expect(
                bookingService.deleteBooking(bookingId, userRole, userEmail)
            ).rejects.toThrow(ApplicationError);
        });

        it('should throw an error if a non-admin user tries to delete another user\'s booking', async () => {
            const bookingId = 1;
            const userRole = 'user';
            const userEmail = 'user@example.com';

            bookingRepositoryMock.findByBookingId = jest.fn().mockResolvedValue({ id: 1, createdBy: 'otheruser@example.com' });

    
            await expect(
                bookingService.deleteBooking(bookingId, userRole, userEmail)
            ).rejects.toThrow(ApplicationError);
        });
    });
});
