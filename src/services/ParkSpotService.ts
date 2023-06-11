import { Service } from 'typedi';

import { LoggerClient } from './LoggerClient';
import ParkingSpotRepository from '../repositories/ParkSpotRepository';

@Service()
export default class UserService {
    constructor(public parkingSpotRepository: ParkingSpotRepository, public logger: LoggerClient) { }

    seedParkingSpot = async () => {
        const result = await this.parkingSpotRepository.createSeedParkSpot();
        return result;
    }

    getParkingSpotByName = async (name: string) => {
        const result = await this.parkingSpotRepository.findByName(name);
        return result;
    }

    getAllParkinSpot = async () => {
        const result = await this.parkingSpotRepository.getAllParkSpot();
        return result;
    };
}
