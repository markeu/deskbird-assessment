import { Request } from 'express';
import { Service } from 'typedi';

import { asyncWrapper } from '../utils/asyncWrapper';
import ParkSpotService from '../services/ParkSpotService';
import { SuccessResponse } from '../utils/SuccessResponse';

@Service()
export default class ParkSpotController {
  constructor(public parkSpotService: ParkSpotService) {}

  seedParkingSpot = asyncWrapper(async () => {
    const response = await this.parkSpotService.seedParkingSpot();
    return new SuccessResponse(response);
  });

  getParkingSpot = asyncWrapper(async (req: Request) => {
    const { name } = req.query;
    const response = await this.parkSpotService.getParkingSpotByName(name as string);
    return new SuccessResponse(response);
  });

  getAllParkingSpots = asyncWrapper(async () => {
    const response = await this.parkSpotService.getAllParkinSpot();
    return new SuccessResponse(response);
  });
}
