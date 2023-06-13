
import { LoggerClient } from '../src/services/LoggerClient';
import ParkSpotService from '../src/services/ParkSpotService';
import ParkingSpotRepository from '../src/repositories/ParkSpotRepository';

// Mocked dependencies
const parkingSpotRepositoryMock: jest.Mocked<ParkingSpotRepository> = {
  createSeedParkSpot: jest.fn(),
  findByName: jest.fn(),
  getAllParkSpot: jest.fn(),
};

let loggerMock: jest.Mocked<LoggerClient>;

describe('ParkSpotService', () => {
  let parkSpotService: ParkSpotService;

  beforeEach(() => {
    loggerMock = new LoggerClient() as jest.Mocked<LoggerClient>;
    parkSpotService = new ParkSpotService(parkingSpotRepositoryMock, loggerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('seedParkingSpot', () => {
    it('should call parkingSpotRepository.createSeedParkSpot and return the result', async () => {
      const expectedResult = 'Successfully Seeded Parking Spots';

      parkingSpotRepositoryMock.createSeedParkSpot = jest.fn().mockResolvedValue(expectedResult);

      const result = await parkSpotService.seedParkingSpot();

      expect(parkingSpotRepositoryMock.createSeedParkSpot).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getParkingSpotByName', () => {
    it('should call parkingSpotRepository.findByName and return the result', async () => {
      const name = 'Spot1';
      const expectedSpot = { name } ;

      parkingSpotRepositoryMock.findByName= jest.fn().mockResolvedValue(expectedSpot);

      const result = await parkSpotService.getParkingSpotByName(name);

      expect(parkingSpotRepositoryMock.findByName).toHaveBeenCalledWith(name);
      expect(result).toEqual(expectedSpot);
    });
  });

  describe('getAllParkinSpot', () => {
    it('should call parkingSpotRepository.getAllParkSpot and return the result', async () => {
      const expectedSpots = [{ name: 'Spot1' }, { name: 'Spot2' }];

      parkingSpotRepositoryMock.getAllParkSpot = jest.fn().mockResolvedValue(expectedSpots);

      const result = await parkSpotService.getAllParkinSpot();

      expect(parkingSpotRepositoryMock.getAllParkSpot).toHaveBeenCalled();
      expect(result).toEqual(expectedSpots);
    });
  });
});
